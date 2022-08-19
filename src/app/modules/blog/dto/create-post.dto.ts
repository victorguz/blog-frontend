import { IsString, Length } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @Length(1, 100)
    readonly name: string;
    @IsString()
    @Length(1, 500)
    readonly description: string;

    @IsString()
    readonly content: string;

    @IsString()
    @Length(1, 50)
    readonly tags: string;

    @IsString()
    @Length(3, 3)
    readonly status: string;

    @IsString()
    readonly image: string;

    @IsString()
    @Length(1, 50)
    readonly category: string;
}
