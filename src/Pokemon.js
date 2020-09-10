import React, { useState, useEffect } from 'react';
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';
import axios from 'axios';

const Pokemon = (props) => {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(function (response) {
                const { data } = response;
                setPokemon(data);
            })
            .catch(function (error) {
                setPokemon(false);
            })
    }, [pokemonId])

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return (
            <React.Fragment>
                <Typography variant='h2'>
                    {`${id}.${name[0].toUpperCase() + name.slice(1)}`}
                    <img src={front_default} />
                </Typography>
                <img style={{ wight: '300px', height: '300px' }} src={fullImageUrl} />
                <Typography variant='h4'>Pokemon Info</Typography>
                <Typography>
                    {`Species: `}
                    <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography>Height: {height}</Typography>
                <Typography>Weight: {weight}</Typography>
                <Typography variant='h5'>Types:</Typography>
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return (
                        <Typography key={name}>{`${name}`}</Typography>
                    )
                })}
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography>Pokemon not found</Typography>}
            {pokemon === !undefined && <Button variant='contained' onClick={() => history.push('/')}>Back to pokedex</Button>}
        </React.Fragment>
    )
}

export default Pokemon; 