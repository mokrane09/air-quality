import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, Max, Min } from "class-validator";

export class CoordinatesDto {
    @IsNumber()
    @IsDefined()
    @Min(-180)
    @Max(180)
    @ApiProperty({
        description: 'Longitude of the location',
        minimum: -180,
        maximum: 180,
    })
    longitude: number;

    @IsNumber()
    @IsDefined()
    @Max(90)
    @Min(-90)
    @ApiProperty({
        description: 'Latitude of the location',
        minimum: -90,
        maximum: 90,
    })
    latitude: number;
}