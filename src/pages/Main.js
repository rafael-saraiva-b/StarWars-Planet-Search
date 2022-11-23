import React, { useState, useEffect } from 'react';
import useData from '../services/useData';

let nextId = 1;

export default function Main() {
  const { isLoading, data: planets = [] } = useData('https://swapi.dev/api/planets');

  const [search, setSearch] = useState('');
  const [colluns, setColluns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [collumSearch, setCollumSearch] = useState('population');
  const [comparationSearch, setComparationSearch] = useState('maior que');
  const [valueSearch, setValueSearch] = useState(0);
  const [filteredByName, setFilteredByName] = useState();
  const [filtros, setFiltros] = useState([]);

  const { results } = planets;

  useEffect(() => {
    if (results) {
      setFilteredByName(results.filter((result) => result.name.includes(search)));
    }
  }, [results, search]);

  useEffect(() => {
    console.log(filtros);
    if (filtros.length !== 0) {
      filtros.forEach((filtro) => {
        setFilteredByName(filteredByName.map((result) => {
          result.notRender = false;
          let test = false;
          switch (filtro.comparator) {
          case 'maior que':
            test = Number(result[filtro.collum]) > Number(filtro.value);
            break;
          case 'menor que':
            test = Number(result[filtro.collum]) < Number(filtro.value);
            break;
          case 'igual a':
            test = Number(result[filtro.collum]) === Number(filtro.value);
            break;
          default:
            test = false;
          }
          if (!test) {
            result.notRender = true;
          }
          return result;
        }));
      });
    } else if (filteredByName) {
      setFilteredByName(filteredByName.map((result) => {
        result.notRender = false;
        return result;
      }));
    }
  }, [filtros]);

  const handleRemoveItem = (e) => {
    const collum = e.target.getAttribute('name');
    if (filtros.length === 1) {
      setFiltros([]);
    } else {
      setFiltros(filtros.filter((item) => item.collum !== collum));
    }
    setColluns([...colluns, collum]);
  };

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
        <select
          data-testid="column-filter"
          onChange={ (e) => setCollumSearch(e.target.value) }
        >
          {colluns.map((collun, index) => <option key={ index }>{collun}</option>)}
          {/* <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option> */}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (e) => setComparationSearch(e.target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ valueSearch }
          onChange={ (e) => setValueSearch(e.target.value) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => {
            setFiltros([
              ...filtros,
              { id: nextId,
                collum: collumSearch,
                comparator: comparationSearch,
                value: valueSearch,
              },
            ]);
            nextId += 1;
            setColluns((current) => current.filter((collum) => collum !== collumSearch));
            setCollumSearch(colluns[1]);
          } }
        >
          filtrar

        </button>
      </form>
      <ul>
        {filtros
        && filtros.map((filtro) => (
          <li data-testid="filter" key={ filtro.id }>
            {' '}
            {filtro.collum}
            {' '}
            {filtro.comparator}
            {' '}
            {filtro.value}
            <button
              name={ filtro.collum }
              type="button"
              onClick={ handleRemoveItem }
              //    () => {
              //   if (filtros.length === 1) {
              //     setFiltros([]);
              //   } else {
              //     ;
              //   }
              //   setColluns([...colluns, filtro.collum]);
              // }

            >
              X

            </button>
          </li>))}
      </ul>
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
          && filteredByName.map((planet, index) => {
            if (!planet.notRender) {
              return (
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
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </>
  );
}
