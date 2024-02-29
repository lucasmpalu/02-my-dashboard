export interface PokemonsResponse {
    count: number;
    next: string;
    previous:null;
    results: Result[]
}

export interface Result {
    name: string;
    url: string;
}

// VER COMO HACER CON 'Paste JSON as Code'