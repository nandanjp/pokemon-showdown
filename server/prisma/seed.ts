import axios from "axios";
import { PokeApiAbilityType, PokeApiGenderType, PokeApiGenerationType, PokeApiGetAllType, PokeApiLocationType, PokeApiMoveType, PokeApiNatureType, PokeApiPokemonType, PokeApiRegionType, PokeApiTypeType, abilitySchema, genderSchema, generationSchema, getAllSchema, locationSchema, moveSchema, natureSchema, pokemonSchema, regionSchema, typeSchema } from "./pokemon.api.schema";
import { AnyZodObject } from "zod";
import log from "../src/utils/logger";
import { db } from "../src/utils/connect.db";

const PokeApiBaseUrl = `https://pokeapi.co/api/v2`;

const getAll = async <T extends { [x: string]: any; }>(type: string, schema: AnyZodObject): Promise<T[]> =>
{
    let currOffset: number = 0, limit: number = 20;
    let endpoint: string = `${PokeApiBaseUrl}/${type}/?offset=${currOffset}&limit=${limit}`;
    let getAllOfType: PokeApiGetAllType | undefined;
    let allPossibleOfType: T[] = [];

    try
    {
        const { data }: { data: PokeApiGetAllType; } = await axios.get(endpoint);
        // log.info(`data: {\n\tcount: ${data.count},\n\tnext: ${data.next},\n\tresults: ${data.results.length}}`);
        getAllOfType = getAllSchema.parse(data);
    } catch (e: any)
    {
        throw new Error(`Failed to get all of the given type from endpoint: ${endpoint}`);
    }

    try
    {
        let i = 1;
        // const total: number = getAllOfType.count;
        const total: number = 1;

        while (i <= total)
        {
            if (i > currOffset + limit)
            {
                currOffset += limit;
                endpoint = `${PokeApiBaseUrl}/${type}/?offset=${currOffset}&limit=${limit}`;

                try
                {
                    const { data }: { data: PokeApiGetAllType; } = await axios.get(endpoint);
                    getAllOfType = getAllSchema.parse(data);
                } catch (e: any)
                {
                    throw new Error(`Failed to get all of the given type from endpoint: ${endpoint}`);
                }

                continue;
            }

            const { data } = await axios.get(`${getAllOfType.results.at(i % 21)?.url}`);
            schema.parse(data);

            allPossibleOfType.push(data as T);
            ++i;
        }
    } catch (e: any)
    {
        console.log(e.errors);
        throw new Error(`Failed to validate the type: ${type}`);
    }

    return allPossibleOfType;
};

const getAbilities = async (): Promise<PokeApiAbilityType[]> =>
{
    const allAbilities: PokeApiAbilityType[] = await getAll<PokeApiAbilityType>("ability", abilitySchema);
    allAbilities.forEach(async (ability) =>
    {
        const { generation, id, is_main_series, name, effect_entries } = ability;
        const effect = effect_entries.at(effect_entries.length - 1);
        const effectDescription: string = effect?.short_effect ?? effect?.effect ?? "No Effect Given";

        let splicedGenerationUrl = generation.url.split(PokeApiBaseUrl)[1].replace(/[^0-9]/g, '');
        const generationId = parseInt(splicedGenerationUrl || "1");

        try
        {
            await db.ability.create({
                data: {
                    id,
                    name,
                    effect: effectDescription,
                    isMainSeries: is_main_series,
                    generationId,
                }
            });
        } catch (e: any)
        {
            console.error(e, `Failed to create given ability: ${name}`);
        }
    });
    return allAbilities;
};

const getGenders = async (): Promise<PokeApiGenderType[]> =>
{
    return getAll<PokeApiGenderType>("gender", genderSchema);
};

const getGenerations = async (): Promise<PokeApiGenerationType[]> =>
{
    return getAll<PokeApiGenerationType>("generation", generationSchema);
};

const getLocations = async (): Promise<PokeApiLocationType[]> =>
{
    return getAll<PokeApiLocationType>("location", locationSchema);
};

const getMoves = async (): Promise<PokeApiMoveType[]> =>
{
    return getAll<PokeApiMoveType>("move", moveSchema);
};

const getNatures = async (): Promise<PokeApiNatureType[]> =>
{
    return getAll<PokeApiNatureType>("nature", natureSchema);
};

const getRegions = async (): Promise<PokeApiRegionType[]> =>
{
    return getAll<PokeApiRegionType>("region", regionSchema);
};

const getTypes = async (): Promise<PokeApiTypeType[]> =>
{
    return getAll<PokeApiTypeType>("type", typeSchema);
};

const getPokemon = async (): Promise<PokeApiPokemonType[]> =>
{
    return getAll<PokeApiPokemonType>("pokemon", pokemonSchema);
};

export const executeAllCalls = async () =>
{
    await Promise.all([getAbilities(), getGenders(), getGenerations(), getLocations(), getMoves(), getNatures(), getRegions(), getTypes(), getPokemon()]);
    log.info("Successfully validated the entire dataset");
};

export const executeOneCall = async () =>
{
    await Promise.resolve(getAbilities());
    log.info("Successfully entered abilities to the database");
};