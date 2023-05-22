import { model, Schema } from "mongoose";
import IVehicles from "../interface/vehicles.interface";
import { VechicleEnum } from "../interface/enum/vehicle.enum";

const VehicleSchema = new Schema<IVehicles>(
  {
    image: { type: String, required: false },
    name: { type: String, required: true },
    model: { type: String, required: true },
    type: {
      type: String,
      enum: VechicleEnum,
      message:
        "{VALUE} is not supported, see the documentation for see acceptable values",
      required: true,
    },
    manufacturer: { type: String, required: false },
    cost_in_credits: { type: Number, required: true },
    length: { type: Number, required: false },
    crew: { type: Number, required: false },
    passengers: { type: Number, required: false },
    cargo_capacity: { type: Number, required: false },
    vehicle_class: { type: Number, required: false },
  },
  { timestamps: true, versionKey: false }
);

export default model<IVehicles>("vehicles", VehicleSchema);
