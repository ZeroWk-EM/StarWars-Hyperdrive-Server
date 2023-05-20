import { VechicleType } from "../interface/enum/vehicletype.enum";
import IVehicles from "../interface/vehicles.interface";
import { model, Schema } from "mongoose";

const VehicleSchema = new Schema<IVehicles>(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    type: {
      type: String,
      enum: VechicleType,
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
