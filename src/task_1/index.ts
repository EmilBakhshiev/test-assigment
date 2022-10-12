import axios from "axios";
import { API } from "./constants/api";
import { ICharacter } from "./types/models/character";
import { IEpisode } from "./types/models/episode";
import { IPaginationInfoAndResults } from "./types/models/info";

const getCountEpisodes = async (): Promise<
    IPaginationInfoAndResults<IEpisode>
  > => {
    try {
      const { data } = await axios.get<IPaginationInfoAndResults<IEpisode>>(
        API.episode
      );

      return data;
    } catch (error) {
      throw error;
    }
  };

  const getAllEpisodes = async (): Promise<IEpisode[]> => {
    try {
      const { info } = await getCountEpisodes();
      const arrIdEpisodes = new Array(info.count)
        .fill(0)
        .map((_, index) => index + 1);

      const { data } = await axios.get<IEpisode[]>(
        `${API.episode}/${arrIdEpisodes}`
      );

      return data;
    } catch (error) {
      throw error;
    }
  };

  const getArrUniqueIdCharacters = async () => {
    try {
      const episodes = await getAllEpisodes();

      const arrId = episodes.map((episode) => {
        return episode.characters
          .map((urlCharactes) => urlCharactes.split('/'))
          .map((urlCharacters) => urlCharacters.slice(-1).join(','));
      });

      return [...new Set(arrId.flat())];
    } catch (error) {
      throw error;
    }
  };

  const getALlCharacters = async (
    id: string[]
  ): Promise<ICharacter[]> => {
    try {
      const { data } = await axios.get<ICharacter[]>(`${API.character}/${[id]}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const replaceCharacter = async () => {
    try {
      const episodes = await getAllEpisodes();
      const uniqueId = await getArrUniqueIdCharacters();
      const characters = await getALlCharacters(uniqueId);

      const episodesWithCharacter = episodes.map((episode) => {
        const filteredCharacter = characters.filter((character) =>
          character.episode.includes(episode.url)
        );
        return { ...episode, characters: filteredCharacter };
      });

      console.log(episodesWithCharacter);
    } catch (error) {
      throw error;
    }
  };

  replaceCharacter();