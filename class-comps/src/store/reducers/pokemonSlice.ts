import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {fetchPokemonData, PokemonDataInterface} from "../../fetch/fetch";
import {nodePackageImporterKey} from "sass/types/importer";

export interface PokemonsState {
    pokemons: PokemonDataInterface[],
    loading: boolean,
    isExporting: boolean,
    selectedItems: PokemonDataInterface[],
    totalCountPokemon: number,
    error: string | null;
    count: number,
    search: string;
}

const initialState: PokemonsState = {
    pokemons: [],
    totalCountPokemon: 0,
    loading: false,
    isExporting: false,
    selectedItems: [],
    error: null,
    count: 0,
    search: '',
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addPokemon(state, action: PayloadAction<PokemonDataInterface>) {
            state.selectedItems.push(action.payload);
        },
        removePokemon(state, action: PayloadAction<PokemonDataInterface>) {
            state.selectedItems = state.selectedItems.filter(pokemon => pokemon.id !== action.payload.id);
        },
        selectAll(state, action?: PayloadAction<boolean>) {
            const currentSelect = current(state.pokemons);
            let midtermArr: PokemonDataInterface[] = [...state.selectedItems, ...currentSelect];
            state.selectedItems = [...new Set(midtermArr)];
        },
        unSelectAll(state, action?: PayloadAction<boolean>) {
            state.selectedItems = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state: PokemonsState, action) => {
                if (!state.loading) {
                    state.loading = true
                }
            })
            .addCase(fetchPokemons.fulfilled, (state: PokemonsState, action) => {
                if (state.loading) {
                    state.loading = false
                    state.pokemons = action.payload.result
                    state.totalCountPokemon = action.payload.count

                }
            })
            .addCase(fetchPokemons.rejected, (state: PokemonsState, action) => {
                if (state.loading) {
                    state.loading = false
                    state.error = action.error
                }
            }).addCase(fetchPokemonByName.pending, (state: PokemonsState, action) => {
            if (!state.loading) {
                state.loading = true
            }
        })
            .addCase(fetchPokemonByName.fulfilled, (state: PokemonsState, action) => {
                if (state.loading) {
                    state.loading = false
                    state.pokemons = [action.payload];
                    state.search = action.payload.name;
                }
            })
            .addCase(fetchPokemonByName.rejected, (state: PokemonsState, action) => {
                if (state.loading) {
                    state.loading = false
                    state.error = action.error
                }
            })
            .addCase(downloadFile.pending, (state, action) => {
                state.isExporting = true;
            })
            .addCase(downloadFile.fulfilled, (state, action) => {
                state.isExporting = false;
            })
            .addCase(downloadFile.rejected, (state, action) => {
                // Do something with error
                state.isExporting = false;
            });
    }
})
export const fetchPokemonByName = createAsyncThunk<PokemonDataInterface>(
    'pokemon/fetchPokemonByName',
    async (param, {rejectWithValue}) => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + `${param}`);

            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();

            const pokemon: PokemonDataInterface = {
                id: data.id,
                name: data.name,
                height: data.height,
                weight: data.weight,
                imgSrc: data.sprites.front_default,
                stats: data.stats,
            };

            return pokemon;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPokemons = createAsyncThunk(
    'pokemon/fetchPokemons',
    async (param, {rejectWithValue}) => {
        let extraParams = (param.limit || param.offset) ? {
            limit: param.limit,
            offset: param.offset
        } : {}
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + `${param.name ? param.name : '?'}` + new URLSearchParams(extraParams).toString());
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const a = await response.json();

            return await Promise.all(a.results.map((pokemon) => {
                return fetchPokemonData(pokemon.name)
            })).then((expandedPokemons) => {
                return {result: expandedPokemons, count: a.count}
            })
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const downloadFile = createAsyncThunk(
    "download/file",
    async (data, thunkApi) => {
        try {
            return fakeDownload(data);
        } catch (e) {
            return thunkApi.rejectWithValue("Impossible to download");
        }
    }
);

const fakeDownload = async (data) =>
    new Promise((resolve) =>
        setTimeout(() => {
            let csvData = jsonToCsv(data);
            // Create a CSV file and allow the user to download it
            let blob = new Blob([csvData], {type: 'text/csv'});
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'data.csv';
            document.body.appendChild(a);
            a.click();
        }, 1000) // I set a timeout to emulate a request.
    );

function jsonToCsv(jsonData) {
    let csv = '';
    // Get the headers
    let headers = Object.keys(jsonData[0]);
    csv += headers.join(',') + '\n';
    // Add the data
    jsonData.forEach(function (row) {
        let data = headers.map(header => JSON.stringify(row[header])).join(','); // Add JSON.stringify statement
        csv += data + '\n';
    });
    return csv;
}

export const {
    selectAll,
    unSelectAll,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
