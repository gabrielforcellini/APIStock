import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Establishment } from '../entity/Establishment';
import { Preferences } from '../entity/Preferences';
import { getToken } from '../helpers/getToken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../entity/User';

dotenv.config();

const SECRET = process.env.secret;

export class PreferencesController {

  static async create(req: Request, res: Response) {
    const { theme, language } = req.body;
    const establishment_id = req.params.establishment_id;

    try {
      const establishmentRespository = AppDataSource.getRepository(Establishment)
      const establishment = await establishmentRespository.findOneBy({ id: parseInt(establishment_id) });
      if (!establishment) {
        return res.status(500).json({ message: "Estabelecimento não existe" })
      }

      const preferenceRepository = AppDataSource.getRepository(Preferences);
      const preferenceExists = await preferenceRepository.findOneBy({ establishment: establishment });
      if (preferenceExists) {
        return res.status(404).json({ message: "Preference already registered!", success: false });
      };

      const preference = new Preferences();
      preference.theme = theme;
      preference.language = language;
      preference.establishment = establishment;

      const newPreference = await preferenceRepository.save(preference);
      res.status(201).json({ newPreference, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findAll(req: Request, res: Response) {
    try {
      const preferenceRepository = AppDataSource.getRepository(Preferences)
        .createQueryBuilder("preferences")
        .select("preferences").addSelect("establishment")
        .leftJoin("preferences.establishment", "establishment")
        .getMany();

      const preferences = await preferenceRepository;
      res.status(200).json({ preferences, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOneById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const preferencesRepository = AppDataSource.getRepository(Preferences)
        .createQueryBuilder("preferences")
        .select("preferences").addSelect("establishment")
        .leftJoin("preferences.establishment", "establishment")
        .where("preferences.id = :id", { id: id })
        .getOne();

      const preferences = await preferencesRepository;
      res.status(200).json({ preferences, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async updateOne(req: Request, res: Response) {
    const id = req.params.id;
    const { theme, language } = req.body;

    try {
      const preferencesRepository = AppDataSource.getRepository(Preferences);
      const preferenceToUpdate = await preferencesRepository
        .createQueryBuilder("preferences")
        .update("preferences")
        .set(
          {
            theme: theme,
            language: language
          }
        )
        .where("id = :id", { id: id })
        .execute();

      res.status(200).json({ preferenceToUpdate, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const preferencesRepository = AppDataSource.getRepository(Preferences);
      await preferencesRepository
        .createQueryBuilder("preferences")
        .delete()
        .from("preferences")
        .where("id = :id", { id: id })
        .execute();

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };

  static async findOneByUser(req: Request, res: Response) {
    try {
      if (req.headers.authorization) {
        const token = getToken(req);
        const decoded = jwt.verify(token, SECRET) as { id: string };

        const userRepository = AppDataSource.getRepository(User);
        const currentUser = await userRepository
          .createQueryBuilder("user")
          .select("user").addSelect("establishment")
          .leftJoin("user.establishment", "establishment")
          .where("user.id = :id", { id: decoded.id })
          .getOne();

        const preferencesRepository = AppDataSource.getRepository(Preferences);
        const currentPreferences = await preferencesRepository
          .createQueryBuilder("preferences")
          .select("preferences")
          .where("preferences.establishment_id = :id", { id: currentUser.establishment.id })
          .getOne();

        res.status(200).json({ currentPreferences, success: true });
      } else {
        res.status(404).send({ error: "token required!", success: false });
      };
    } catch (error) {
      res.status(500).json({ error, success: false });
    };
  };
};