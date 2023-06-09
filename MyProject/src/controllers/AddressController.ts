import { Request, Response } from 'express';
import { Address } from '../entity/Address/Address';
import { AppDataSource } from '../data-source';
import { Country } from '../entity/Address/Country';
import { State } from '../entity/Address/State';
import { City } from '../entity/Address/City';
import { District } from '../entity/Address/District';

export class AddressController {

  static async findAll(req: Request, res: Response) {
    try {
      const addressRespository = AppDataSource
                                    .getRepository(Address)
                                    .createQueryBuilder("address")
                                    .leftJoinAndSelect("address.district" , "district")
                                    .leftJoinAndSelect("district.city", "city")
                                    .leftJoinAndSelect("city.state", "state")
                                    .leftJoinAndSelect("state.country", "country")
                                    .getMany();
      const address = await addressRespository;
      res.status(200).json({ address, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
  static async findAllContries(req: Request, res: Response) {
    try {
      const contriesRespository = AppDataSource
                                    .getRepository(Country)
                                    .createQueryBuilder("country")
                                    .getMany();
      const countries = await contriesRespository;
      res.status(200).json({ countries, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
  static async findAllStates(_req: Request, res: Response) {
    try {
      const statesRespository = AppDataSource
                                  .getRepository(State)
                                  .createQueryBuilder("state")
                                  .getMany();
      const states = await statesRespository;
      res.status(200).json({ states, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
  static async findAllCities(req: Request, res: Response) {
    try {
      const citiesRespository = AppDataSource
                                  .getRepository(City)
                                  .createQueryBuilder("city")
                                  .getMany();
      const cities = await citiesRespository;
      res.status(200).json({ cities, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
  static async findAllDistricties(req: Request, res: Response) {
    try {
      const districtiesRespository = AppDataSource
                                  .getRepository(District)
                                  .createQueryBuilder("district")
                                  .getMany();
      const districties = await districtiesRespository;
      res.status(200).json({ districties, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findById(req: Request, res: Response){
    const id = req.params.id;

    try {
      const addressRespository = AppDataSource
                                    .getRepository(Address)
                                    .createQueryBuilder("address")
                                    .leftJoinAndSelect("address.district" , "district")
                                    .leftJoinAndSelect("district.city", "city")
                                    .leftJoinAndSelect("city.state", "state")
                                    .leftJoinAndSelect("state.country", "country")
                                    .where('address.id = :id', { id: parseInt(id)})
                                    .getOne();
      const address = await addressRespository;
      res.status(200).json({ address, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  }
  static async findCountryById(req: Request, res: Response){
    const id = req.params.id;

    try {
      const contriesRespository = AppDataSource.getRepository(Country);
      const country = await contriesRespository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ country, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  }
  static async findStateById(req: Request, res: Response){
    const id = req.params.id;

    try {
      const statesRespository = AppDataSource.getRepository(State);
      const state = await statesRespository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ state, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  }
  static async findCityById(req: Request, res: Response){
    const id = req.params.id;

    try {
      const citiesRespository = AppDataSource.getRepository(City);
      const city = await citiesRespository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ city, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  }
  static async findDistrictById(req: Request, res: Response){
    const id = req.params.id;

    try {
      const districtiesRespository = AppDataSource.getRepository(City);
      const district = await districtiesRespository.findOneBy({ id: parseInt(id) });
      res.status(200).json({ district, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  }

  static async createAddress(req: Request, res: Response){
    const {
      street,
      number,
      zip_code,
      district_name,
      city_name,
      state_name,
      state_initials,
      country_name,
      country_initials
    } = req.body
    
    let country: Country;
    try {
      const countryRepository = AppDataSource.getRepository(Country);
      country = await countryRepository.findOneBy({ name: country_name});
    } catch (error){
      res.status(500).json({ error, success: false });
    }
      
    if(!country){
      country = new Country();
      country.name = country_name;
      country.initials = country_initials;
      
      country = await AppDataSource.manager.save(country);
    }
    let state: State;
    try {
      const stateRepository = AppDataSource.getRepository(State)
                                              .createQueryBuilder("state")
                                              .leftJoin("state.country", 'country')
                                              .where("state.country = :id", { id: country.id})
                                              .andWhere("state.name = :name", { name: state_name})
                                              .getOne();
      state = await stateRepository;
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  
    if(!state){
      state = new State();
      state.name = state_name;
      state.initials = state_initials;
      state.country = country;

      state = await AppDataSource.manager.save(state);
    }

    let city: City;
    try {
      const cityRepository = AppDataSource.getRepository(City)
                                            .createQueryBuilder("city")
                                            .leftJoin("city.state", 'state')
                                            .where("city.state = :id", { id: state.id})
                                            .andWhere("city.name = :name", { name: city_name})
                                            .getOne();
      city = await cityRepository;
    } catch (error){
      res.status(500).json({ error, success: false });
    }
    
    if(!city){
      city = new City();
      city.name = city_name;
      city.state = state;
    
      city = await AppDataSource.manager.save(city);
    }

    let district: District;
    try {
      const districtRepository = AppDataSource.getRepository(District)
                                                .createQueryBuilder("district")
                                                .leftJoin("district.city", 'city')
                                                .where("district.city = :id", { id: city.id})
                                                .andWhere("district.name = :name", { name: district_name})
                                                .getOne();
      district = await districtRepository;
    } catch (error) {
      res.status(500).json({ error, success: false });
    }

    if(!district){
      district = new District();
      district.name = district_name;
      district.city = city;

      district = await AppDataSource.manager.save(district);
    } 

    const address = new Address();
    address.street = street;
    address.number = number;
    address.zip_code = zip_code;
    address.district = district;

    try{
      const newAddress = await AppDataSource.manager.save(address);
      res.status(200).json({ newAddress, success: true})
    } catch (error){
      res.status(500).json({ error, success: false });
    };  
  }
};