import { Injectable } from "@angular/core";
import { arrayNotEmpty, isArray, isEmpty, isNotEmpty, isNotEmptyObject, isObject, isString } from "class-validator";
import { environment } from "src/environments/environment";
import { BasicResponse } from "../models/basic-response.model";
import { RequestsService } from "./requests.service";

enum CurrentQueryAction {
  SELECT = "SELECT", INSERT = "INSERT", UPDATE = "UPDATE", DELETE = "DELETE", QUERY = "QUERY"
}

@Injectable({
  providedIn: 'root',
})

/**
 * Réplica de Modelo Mapper
 */
export class QueriesService {

  private _table: string;
  private _columns: string;
  private _where: string | object;
  private _values: object | object;
  private _limit: number;
  private _sqlQuery: string;

  private currentAction: CurrentQueryAction;
  private getOnlySQL: boolean = false

  constructor(private requestService: RequestsService) { }

  /**
   * Seleccionar nombre de la tabla
   * @param table Nombre de la tabla
   * @returns QueriesService
   */
  table(table: string): QueriesService {
    this._table = table.trim().toLowerCase()
    this.currentAction = CurrentQueryAction.SELECT
    return this
  }


  /**
   *
   * @param values nuevos valores
   * @returns QueriesService
   */
  private setValues(values: object | object[]) {
    this._values = values
    return this
  }

  /**
   * Seleccionar columnas a buscar
   * @param columns Nombres de las columnas
   * @returns QueriesService
   */
  select(...columns: string[]) {
    this.currentAction = CurrentQueryAction.SELECT
    this._columns = columns.join(", ")
    return this
  }

  selectWithArray(columns: string[]) {
    this.currentAction = CurrentQueryAction.SELECT
    this._columns = columns.join(", ")
    return this
  }

  /**
   * Asigna los valores a actualizar
   * @param where objeto (clave:valor) o string - clausula where
   * @param limit numero maximo de registros actualizados, por defecto 1, no puede ser 0
   * @returns QueriesService
   */
  update(values: object, where: string | object, limit: number = 1) {
    this.currentAction = CurrentQueryAction.UPDATE
    this.setValues(values)
    this.where(where)
    this.limit(limit)
    return this
  }

  /**
   * Asigna los valores a insertar (los que no estén en el objeto tendrán sus valores por defecto o null)
   * @param columns Nombres de las columnas
   * @returns QueriesService
   */
  insert(values: object | object[]) {
    this.currentAction = CurrentQueryAction.INSERT
    this.setValues(values)
    return this
  }

  /**
   * Seleccionar columnas a buscar
   * @param columns Nombres de las columnas
   * @returns QueriesService
   */
  delete(where: object | string, limit: number) {
    this.currentAction = CurrentQueryAction.DELETE
    this.where(where)
    this.limit(limit)
    return this
  }

  /**
   * Seleccionar el numero de registros
   * @param limit numero de registros
   * @returns QueriesService
   */
  limit(limit: number) {
    this._limit = limit
    return this
  }

  /**
   * Selecciona una clausula where
   * @param where objeto (clave:valor) o string
   * @returns QueriesService
   */
  where(where: string | object) {
    this._where = ""
    if (isString(where) && isNotEmpty(where)) {
      this._where = where.trim()
    }
    if (isObject(where) && isNotEmptyObject(where)) {
      for (const key in where) {
        if (Object.prototype.hasOwnProperty.call(where, key)) {
          const element = where[key];
          if (this._where == "") {
            let newClause = element === null ? `${key} IS NULL` : `${key} = ${isString(element) ? `'${element}'` : element}`
            this._where = newClause
          } else {
            let newClause = element === null ? `${key} IS NULL` : `${key} = ${isString(element) ? `'${element}'` : element}`
            this._where += " AND " + newClause
          }
        }
      }
    }
    if (Array.isArray(where) && arrayNotEmpty(where)) {
      where.forEach(obj => {
        let condition = ""
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            if (condition == "") {
              let newClause = element === null ? `${key} IS NULL` : `${key} = ${isString(element) ? `'${element}'` : element}`
              condition = newClause
            } else {
              let newClause = element === null ? `${key} IS NULL` : `${key} = ${isString(element) ? `'${element}'` : element}`
              condition += " AND " + newClause
            }
          }
        }
        if (condition != "") {
          if (this._where == "") {
            this._where = ` (${condition}) `
          } else {
            this._where += `OR (${condition}) `
          }
        }
      });
    }
    return this
  }

  /**
   * Utilice un query personalizado
   * @param query
   * @returns QueriesService
   */
  query(query: string) {
    this.currentAction = CurrentQueryAction.QUERY
    this._sqlQuery = query
    return this
  }

  /**
   * Esta opcion habilita que se retornará solo la consulta SQL formada
   * @returns QueriesService
   */
  sql() {
    this.getOnlySQL = true
    return this
  }

  /**
   * Limpia la consulta
   */
  clear() {
    this._table = "";
    this._columns = "";
    this._where = "";
    this._values = {};
    this._limit = 0;
    this._sqlQuery = "";
    this.currentAction = CurrentQueryAction.SELECT;
    this.getOnlySQL = false
  }

  private checkTable() {
    if (isEmpty(this._table)) {
      throw new Error("Debe seleccionar una tabla primero");
    }
  }

  private checkWhere() {
    if (isEmpty(this._where)) {
      throw new Error("Esta consulta no se ejecutará sin una clausula where");
    }
  }

  private checkQuery() {
    if (isEmpty(this._sqlQuery)) {
      throw new Error("No se puede realizar un query si no nos das el query :c");
    }
  }

  private checkLimit() {
    if (this._limit <= 0) {
      throw new Error("Esta consulta no se ejecutará sin un límite >= 0");
    }
  }
  private checkValueForUpdate() {
    if (isObject(this._values) && !isNotEmptyObject(this._values)) {
      throw new Error("Esta consulta no se ejecutará con objetos undefined, null o vacíos");
    }
  }
  private checkValueForInsert() {
    if ((isObject(this._values) && !isNotEmptyObject(this._values)) || (isArray(this._values) && !arrayNotEmpty(this._values))) {
      throw new Error("Esta consulta no se ejecutará con si el objeto o array es undefined, null o vacío");
    }
  }

  /**
   * Ejecuta la consulta construida
   */
  async execute(): Promise<BasicResponse> {
    this.checkTable()
    let result: BasicResponse
    switch (this.currentAction) {
      case CurrentQueryAction.SELECT: result = await this._select(); this.clear(); return result;
      case CurrentQueryAction.INSERT: result = await this._insert(); this.clear(); return result;
      case CurrentQueryAction.UPDATE: result = await this._update(); this.clear(); return result;
      case CurrentQueryAction.DELETE: result = await this._delete(); this.clear(); return result;
      case CurrentQueryAction.QUERY: result = await this._query(); this.clear(); return result;
      default: throw new Error("Debe seleccionar primero alguna acción");
    }
  }

  private async _select() {
    return await this.requestService.makeRequest("", environment.apis.query.Select, { table: this._table, columns: this._columns, where: this._where, limit: this._limit, sqlBoolean: this.getOnlySQL })
  }

  private async _insert() {
    this.checkValueForInsert()
    return await this.requestService.makeRequest("", environment.apis.query.Insert, { table: this._table, values: this._values, sqlBoolean: this.getOnlySQL })
  }

  private async _update() {
    this.checkValueForUpdate()
    this.checkWhere()
    this.checkLimit()
    return await this.requestService.makeRequest("", environment.apis.query.Update, { table: this._table, values: this._values, where: this._where, limit: this._limit, sqlBoolean: this.getOnlySQL })
  }

  private async _delete() {
    this.checkWhere()
    this.checkLimit()
    return await this.requestService.makeRequest("", environment.apis.query.Delete, { table: this._table, where: this._where, limit: this._limit, sqlBoolean: this.getOnlySQL })
  }

  private async _query() {
    this.checkQuery()
    return await this.requestService.makeRequest("", environment.apis.query.SQL, { query: this._sqlQuery, sqlBoolean: this.getOnlySQL })
  }
}
