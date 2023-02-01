import { IsDefined, IsNumber, Max, Min } from "class-validator";

export class CoordinatesDto {
    @IsNumber()
    @IsDefined()
    @Min(-180)
    @Max(180)
    
    longitude: number;

    @IsNumber()
    @IsDefined()
    @Max(90)
    @Min(-90)
    latitude: number;
}