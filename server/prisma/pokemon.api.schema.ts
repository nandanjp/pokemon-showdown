import { object, string, number, boolean, array, z } from "zod";

export const getAllSchema = object({
    count: number(),
    next: string().nullable(),
    results: array(object({
        name: string(),
        url: string()
    }))
});

export const pokemonSchema = object({
    abilities: array(object({
        ability: object({
            name: string(),
            url: string().url()
        }),
        is_hidden: boolean()
    })),
    base_experience: number(),
    game_indices: array(object({
        game_index: number(),
        version: object({
            name: string(),
            url: string().url()
        })
    })),
    height: number(),
    id: number(),
    moves: array(object({
        move: object({
            name: string(),
            url: string().url()
        }),
        version_group_details: array(object({
            level_learned_at: number()
        }))
    })),
    name: string(),
    order: number(),
    sprites: object({
        back_default: string(),
        back_shiny: string(),
        front_default: string(),
        front_shiny: string()
    }),
    stats: array(object({
        base_stat: number(),
        stat: object({
            name: string()
        })
    })),
    types: array(object({
        type: object({
            name: string(),
            url: string().url()
        })
    })),
    weight: number()
});

export const abilitySchema = object({
    effect_entries: array(object({
        effect: string(),
        short_effect: string()
    })),
    generation: object({
        name: string(),
        url: string().url()
    }),
    id: number(),
    is_main_series: boolean(),
    name: string(),
    pokemon: array(object({
        is_hidden: boolean(),
        pokemon: object({
            name: string(),
            url: string().url()
        })
    }))
});

export const genderSchema = object({
    id: number(),
    name: string(),
    pokemon_species_details: array(object({
        pokemon_species: object({
            name: string(),
            url: string().url()
        })
    }))
});

export const generationSchema = object({
    abilities: array(object({
        name: string(),
        url: string().url()
    })),
    id: number(),
    main_region: object({
        name: string(),
        url: string().url()
    }),
    moves: array(object({
        name: string(),
        url: string().url()
    })),
    name: string(),
    pokemon_species: array(object({
        name: string(),
        url: string().url()
    })),
    types: array(object({
        name: string(),
        url: string().url()
    })),
    version_groups: array(object({
        name: string(),
        url: string().url()
    }))
});

export const locationSchema = object({
    areas: array(object({
        name: string(),
        url: string()
    })),
    id: number(),
    name: string(),
    region: object({
        name: string(),
        url: string().url()
    })
});

export const moveSchema = object({
    accuracy: number(),
    damage_class: object({
        name: string(),
        url: string().url()
    }),
    generation: object({
        name: string(),
        url: string().url()
    }),
    id: number(),
    learned_by_pokemon: array(object({
        name: string(),
        url: string().url()
    })),
    name: string(),
    power: number().nullable(),
    pp: number(),
    priority: number(),
    type: object({
        name: string(),
        url: string().url()
    })
});

export const natureSchema = object({
    decreased_stat: object({
        name: string(),
        url: string().url()
    }).nullable(),
    id: number(),
    increased_stat: object({
        name: string(),
        url: string().url()
    }).nullable(),
    name: string()
});

export const regionSchema = object({
    id: number(),
    locations: array(object({
        name: string(),
        url: string().url()
    })),
    main_generation: object({
        name: string(),
        url: string()
    }),
    name: string(),
    version_groups: array(object({
        name: string(),
        url: string().url()
    }))
});

export const typeSchema = object({
    damage_relations: object({
        double_damage_from: array(object({
            name: string(),
            url: string().url()
        })),
        double_damage_to: array(object({
            name: string(),
            url: string().url()
        })),
        half_damage_from: array(object({
            name: string(),
            url: string().url()
        })),
        half_damage_to: array(object({
            name: string(),
            url: string().url()
        })),
    }),
    generation: object({
        name: string(),
        url: string().url()
    }),
    id: number(),
    move_damage_class: object({
        name: string(),
        url: string().url()
    }),
    moves: array(object({
        name: string(),
        url: string().url()
    })),
    name: string(),
    pokemon: array(object({
        pokemon: object({
            name: string(),
            url: string()
        })
    }))
});

export type PokeApiGetAllType = z.infer<typeof getAllSchema>;
export type PokeApiPokemonType = z.infer<typeof pokemonSchema>;
export type PokeApiAbilityType = z.infer<typeof abilitySchema>;
export type PokeApiGenderType = z.infer<typeof genderSchema>;
export type PokeApiGenerationType = z.infer<typeof generationSchema>;
export type PokeApiLocationType = z.infer<typeof locationSchema>;
export type PokeApiMoveType = z.infer<typeof moveSchema>;
export type PokeApiNatureType = z.infer<typeof natureSchema>;
export type PokeApiRegionType = z.infer<typeof regionSchema>;
export type PokeApiTypeType = z.infer<typeof typeSchema>;
