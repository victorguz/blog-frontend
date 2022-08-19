import {
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
    Length,
} from 'class-validator';

export class UpdatePostDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    readonly id?: number;

    @IsString()
    @Length(1, 100)
    @IsOptional()
    readonly name: string;

    @IsString()
    @Length(1, 500)
    @IsOptional()
    readonly description: string;

    @IsString()
    @IsOptional()
    readonly content: string;

    @IsString()
    @IsOptional()
    readonly image: string;

    @IsString()
    @Length(1, 50)
    @IsOptional()
    readonly tags: string;

    @IsString()
    @Length(1, 50)
    @IsOptional()
    readonly category: string;
}
