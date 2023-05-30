import { Schema, model } from "mongoose";
import { IEndpoint } from "../interface/endpoint.interface";

const EndpointSchema = new Schema<IEndpoint>(
  {
    title: { type: String, required: true },
    backgroundIMG: { type: String, required: true },
    icon: { type: String, required: true },
    counter: { type: Number, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<IEndpoint>("endpoint", EndpointSchema);
