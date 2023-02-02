import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PollutionDocument = Pollution & Document;

@Schema({
  timestamps: true,
})
export class Pollution {
  @Prop()
  city: string;

  @Prop()
  ts: Date;

  @Prop()
  aqius: number;

  @Prop()
  mainus: string;

  @Prop()
  aqicn: number;

  @Prop()
  maincn: string;
}
export const PollutionSchema = SchemaFactory.createForClass(Pollution);
