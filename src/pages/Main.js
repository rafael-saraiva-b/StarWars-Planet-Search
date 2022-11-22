import React, { useState, useEffect } from 'react';
import useData from '../services/useData';

export default function Main() {
  const { isLoading, data: planets = [] } = useData('https://swapi.dev/api/planets');
  const [search, setSearch] = useState('');
  const [filteredByName, setFilteredByName] = useState();
  const { results } = planets;
  useEffect(() => {
    if (results) {
      setFilteredByName(results.filter((result) => result.name.includes(search)));
    }
  }, [results, search]);
  // const filteredByName = results.filter((result) => result.name.includes(search));
  if (isLoading) return <h1>Carregando...</h1>;
  return (
    <>
      <form>
        <label htmlFor="filtros">
          <input
            data-testid="name-filter"
            type="text"
            name="filtros"
            placeholder="buscar"
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
          />
        </label>
      </form>
      <table>
        <caption>Tabela de gastos</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { filteredByName
          && filteredByName.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
