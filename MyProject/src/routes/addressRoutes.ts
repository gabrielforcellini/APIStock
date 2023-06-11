import express from "express";
import { AddressController } from "../controllers/AddressController";

const addressRouter = express.Router();

// Find All
addressRouter.get("/find-all", AddressController.findAll);
addressRouter.get("/countries", AddressController.findAllContries)
addressRouter.get("/states", AddressController.findAllStates)
addressRouter.get("/cities", AddressController.findAllCities)
addressRouter.get("/districties", AddressController.findAllDistricties)

// Find by id
addressRouter.get("/:id", AddressController.findById);
addressRouter.get("/country/:id", AddressController.findCountryById)
addressRouter.get("/state/:id", AddressController.findStateById)
addressRouter.get("/city/:id", AddressController.findCityById)
addressRouter.get("/district/:id", AddressController.findDistrictById)

// Create
addressRouter.post("/create", AddressController.createAddress)

export default addressRouter;