import React, { useState } from 'react'
import '../styles/Accesos.css'

export default function Accesos() {
  const handleRegistrar = (e) => {
    e.preventDefault()
  }

  const [selectedOption, setSelectedOption] = useState('');

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  const [selectedTab, setSelectedTab] = useState('negro');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');

  const handleNumberChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  const handleLetterChange = (event) => {
    setSelectedLetter(event.target.value);
  };

  return (
    // <div className="container">
    //   <div className="top">
    //     <div className="section"></div>
    //     <div className="section"></div>
    //     <div className="section"></div>
    //   </div>
    //   <div className="bottom"></div>

    // </div>
    <div className="container">
      <div className="top">
        <div className="part part1">
          <h2>Ingreso:</h2>
          <p>Placa Vehiculo:</p>
          <input type="text" className="textbox" />
        </div>

        <div className="part part2">
          <div>
            <div className="tab-container">
              <div
                className={`tab ${selectedTab === 'negro' ? 'selected' : ''}`}
                onClick={() => handleTabChange('negro')}
              >
                Negro
              </div>
              <div
                className={`tab ${selectedTab === 'rojo' ? 'selected' : ''}`}
                onClick={() => handleTabChange('rojo')}
              >
                Rojo
              </div>
            </div>

            <div className={`content ${selectedTab}`}>
              {selectedTab === 'negro' ? (
                <div>
                  <p>Seleccionar espacio:</p>
                  <div className="dropdown-container">
                    <div className="dropdown">
                      <label htmlFor="numberDropdown">Número:</label>
                      <select id="numberDropdown" value={selectedNumber} onChange={handleNumberChange}>
                        <option value="">Seleccionar número</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>

                    <div className="dropdown">
                      <label htmlFor="letterDropdown">Letra:</label>
                      <select id="letterDropdown" value={selectedLetter} onChange={handleLetterChange}>
                        <option value="">Seleccionar letra</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>

                    <div className="combination-box">
                      {selectedNumber && selectedLetter && (
                        <p>{selectedNumber}{selectedLetter}</p>
                      )}
                    </div>
                  </div>



                </div>
              ) : (
                <div>
                  <div className='automatico-container'>
                  Contenido de la pestaña rojo
                  <p>casa</p>
                  <div className="combination-box">
                      {selectedNumber && selectedLetter && (
                        <p>{selectedNumber}{selectedLetter}</p>
                      )}
                    </div>

                  </div>

              
                </div>
              )}
            </div>
          </div>


        </div>
        <div className="part part3">
          <button className="registerButton">Registrar</button>
        </div>
      </div>
      <div className="bottom">
        <div className="part part4"></div>
        <div className="part part5"></div>
        <div className="part part6"></div>
      </div>
    </div>
  )
}
