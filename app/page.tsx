'use client'

import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

export default function Home() {
  const [state, setState] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({pvSize: '0', batterySize: '0', completed: false});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false); 
  const fakeEmail = "email@email.com";
  const fakePassword = "password";


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setResults({
        pvSize: (Math.random() * 80).toFixed(2),
        batterySize: (Math.random() * 80).toFixed(2),
        completed: true
      });
      setIsLoading(false);
    }, 3000);
  }
  function handleResetB(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(false);
    
    
      setResults({
        pvSize: '0',
        batterySize: '0',
        completed: false
      })
  }
  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();

    if (email === fakeEmail && password === fakePassword) {
      console.log(email)
      console.log(password)
      setIsAuthenticated(true);
      setIsLoginVisible(false);
      setActiveTab('simulation');
    } else {
      alert("Incorrect email or password. Please try again.");
    }
  }
  function handleSimulationClick() {
    if (!isAuthenticated) {
      setIsLoginVisible(true);
    } else {
      setActiveTab('simulation');
    }
  }
  

  useEffect(function mount() {
    setState(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  return (
    <>
      {/* Sticky Header */}
      <div className="sticky-header">
        <div className="tab-container">
          <button 
            className={`tab-button ${activeTab === 'home' ? 'active' : ''}`} 
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={`tab-button ${activeTab === 'simulation' ? 'active' : ''}`} 
            onClick={handleSimulationClick}
          >
            Mini-Grid Simulation
          </button>
        </div>
      </div>

      {/* Tab Content */}
        <div className={`${state ? '' : 'grid'} grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-10 sm:p-10 font-[family-name:var(--font-geist-sans)]`}>
          <main className={`${state ? '' : 'flex'} flex-col items-center gap-8`}>

          {activeTab === 'home' && !isLoginVisible && (
            <div className="content-container">
              <h1><a href="https://github.com/MgenGlder/P2-Solar-Mini-Grid-Design-Optimization">P2 Solar Mini-Grid: Design Optimization</a></h1>
              <section className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] border-thick w-full">
                <h1>
                  <p className="mb-4">
                    👋🏾 Hey there! We&apos;d really appreciate it if you took the time to complete our <a href="https://forms.office.com/r/LSdWtYARMs"><b className="survey-link">🗳️ SURVEY 🗳️</b></a> and provide us some feedback! Thank you 🙇🏽‍♂️
                  </p>
                </h1>
              </section>
              <section className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] border-thick w-full">
                <h2 className="font-bold">Description:</h2>
                <p className="mb-4">
                The state-of-the-art in mini-grid design is poor. Most of it runs on rules of thumb, and the few software tools that exist are notoriously oversimplified and return useless results. This leads to over- and under-sized mini-grids that are unprofitable and/or don&apos;t provide reliable power to communities. Renewvia, like many companies, has begun developing small, Excel-based software tools to simulate mini-grid performance. A talented software developer with an interest in machine learning could build on the simulation work already done to test different convex optimization tools to create an automatic mini-grid design tool. Users would input the location of the mini-grid, as well as information about potential customers and financing. The model would, ideally, output a mini-grid design optimized for 20-year IRR, including a shopping list and financial model. We built a proof-of-concept last year that used a genetic algorithm to optimize design that produced promising results. Refining and expanding that tool could finally bring engineering maturity to the mini-grid industry.
                </p>
              </section>

              <section className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] border-thick">
                <h2 className="font-bold">Team Members and Roles:</h2>
                <ul className="list-inside list-disc mb-4">
                  <li>Earth - Back-End Engineer -  Python, SQL, Java, JS, Gen AI Integration</li>
                  <li>Pranav - Front-End Engineer - Angular, React, JavaScript, Java, Python, C++, HTML, AWS</li>
                  <li>Kunle - Front-End Engineer - Python, Go, Java, Javascript, React</li>
                </ul>
              </section>
              
              <section className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] border-thick">
                <h2 className="font-bold">Project Goal:</h2>
                <p className="mb-4">
                  Improve the design optimization of mini-grids by creating an automatic mini-grid design tool that outputs a mini-grid design optimized for 20-year IRR, including a shopping list and financial model.
                </p>
              </section>

              <section className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] border-thick">
              <h2 className="font-bold">Lighthouse Scores Desktop:</h2>
                <ul className="list-inside list-decimal">
                  <li>Performance: 100</li>
                  <li>Accessibility: 100</li>
                  <li>Best Practices: 100</li>
                  <li>SEO: 100</li>
                </ul>
              </section>
              <section className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] border-thick">
                <h2 className="font-bold">Lighthouse Scores Mobile:</h2>
                <ul className="list-inside list-decimal">
                  <li>Performance: 99</li>
                  <li>Accessibility: 100</li>
                  <li>Best Practices: 100</li>
                  <li>SEO: 100</li>
                </ul>
              </section>

            </div>
          )}
          {isLoginVisible && !isAuthenticated && (
            <div className="login-container">
              <h2>Login</h2>
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="text" id="email" name="email" required placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" required placeholder="Enter password" />
                </div>
                <button type="submit" className="submit-button">Login</button>
              </form>
            </div>
          )}

          {activeTab === 'simulation' && isAuthenticated && (
          <div className="form-container text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] border-thick">
            <Tooltip id="form-tooltip" />
            <h2>Mini-Grid Simulation Parameters</h2>
            <p>Note: Hover over the name of the field for more information!</p>
            <br/>
            {isLoading ? (
              <div className="loading-animation">
                <p>Retrieving results...</p>
              </div>
            ) : results.completed ? (
              <div className="results">
                <p>PV Size = {results.pvSize}</p>
                <p>Battery Size = {results.batterySize}</p>
                <form className="reset-form" onSubmit={handleResetB}>
                  <button type="submit" className="submit-button">Reset</button>
                </form>
              </div>
            ) : (
              <form className="simulation-form" onSubmit={handleSubmit}>
                <p>PV</p>
                {/* Array Size */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="The size of the PV Array. Ex: 118.0 kW">
                    <label htmlFor="name">Array Size</label>
                  </a>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Array Size"
                    required
                  />
                </div>
        
                {/* Array Losses */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="The array losses of the PV, measured as a percent.  Ex: 11.42 NOTE: 11.42% is what PVWatts recommends if you take out availability losses.">
                    <label htmlFor="arrayLosses">Array Losses</label>
                  </a>
                  <input
                    type="number"
                    id="arrayLosses"
                    name="arrayLosses"
                    placeholder="Enter Array Losses"
                    min="0"
                    max="100"
                    required
                  />
                </div>
                <p>Battery</p>
                {/* Capacity */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="The capacity of the battery measured in kWh, as a number with a single decimal. Ex: 510.0">
                    <label htmlFor="batteryCapacity">Capacity (with correct C-value)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryCapacity"
                    name="batteryCapacity"
                    placeholder="Enter Battery Capacity"
                    required
                  />
                </div>

                {/* Minimum Allowable SOC */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Minimum allowable SOC, measured as a percent. Ex: 15">
                    <label htmlFor="batteryMinimumAllowableSOC">Minimum Allowable SOC</label>
                  </a>
                  <input
                    type="number"
                    id="batteryMinimumAllowableSOC"
                    name="batteryMinimumAllowableSOC"
                    placeholder="Enter Minimum Allowable SOC"
                    required
                  />
                </div>

                <p>Power Conversion</p>
                {/* Battery Inverter Power */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Battery inverter power, measured in kWh, as a number with a single decimal. Ex. 20.0">
                    <label htmlFor="batteryInverterPower">Battery Inverter Power</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterPower"
                    name="batteryInverterPower"
                    placeholder="Enter Battery Inverter Power"
                    required
                  />
                </div>

                {/* Solar inverter/CC Power */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Solar inverter/CC Power, measured in kWh, as a number with a single decimal. Ex. 20.0">
                    <label htmlFor="solarInterverCCPower">Solar Inverter/CC Power</label>
                  </a>
                  <input
                    type="number"
                    id="solarInterverCCPower"
                    name="solarInterverCCPower"
                    placeholder="Enter Battery Inverter/CC Power"
                    required
                  />
                </div>

                {/* Battery charging limit */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Battery charging limit, measured in kWh, as a number with a single decimal. Ex. 20.0">
                    <label htmlFor="batteryChargingLimit">Battery Charging Limit</label>
                  </a>
                  <input
                    type="number"
                    id="batteryChargingLimit"
                    name="batteryChargingLimit"
                    placeholder="Enter Battery Charging Limit"
                    required
                  />
                </div>

                <p>Generator</p>
                {/* Size */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Generator size, measured in kWh, as a number with a single decimal. Ex. 20.0">
                    <label htmlFor="generatorSize">Size</label>
                  </a>
                  <input
                    type="number"
                    id="generatorSize"
                    name="generatorSize"
                    placeholder="Enter Generator Size"
                    required
                  />
                </div>

                <p>System</p>
                {/* Distributed Losses */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Distributed losses, measured as a percent. Ex. 20">
                    <label htmlFor="systemDistributedLosses">Distributed Losses</label>
                  </a>
                  <input
                    type="number"
                    id="systemDistributedLosses"
                    name="systemDistributedLosses"
                    placeholder="Enter Distributed Losses"
                    required
                  />
                </div>

                {/* PV Coupling */}
                <div className="form-group">
                    <a data-tooltip-id="form-tooltip" data-tooltip-content="PV Coupling of the system, choose one of the allowed options.">
                      <label htmlFor="systemPVCoupling">PV Coupling</label>
                    </a>
                    <input
                      type="number"
                      id="systemDistributedLosses"
                      name="systemDistributedLosses"
                      placeholder="Enter Distributed Losses"
                      disabled={true}
                      required
                    />
                </div>

                {/* Closest Location */}
                <div className="form-group">
                    <a data-tooltip-id="form-tooltip" data-tooltip-content="Closest location of the system, as a whole number choose one of the allowed options.">
                      <label htmlFor="systemClosestLocation">Closest Location</label>
                    </a>
                    <input
                      type="number"
                      id="systemClosestLocation"
                      name="systemClosestLocation"
                      placeholder="Enter Closest Location"
                      disabled={true}
                      required
                    />
                </div>

                <p>Customers</p>
                {/* Residential Customers */}
                <div className="form-group">
                    <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of residential customers, measured as a whole number. Ex: 20">
                      <label htmlFor="customersResidential">Residential Customers</label>
                    </a>
                    <input
                      type="number"
                      id="customersResidential"
                      name="customersResidential"
                      placeholder="Enter Number Of Residential Customers"
                      required
                    />
                </div>

                {/* Commercial Customers */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of commercial customers, measured as a whole number. Ex: 20">
                    <label htmlFor="customersCommercial">Commercial Customers</label>
                  </a>
                  <input
                    type="number"
                    id="customersCommercial"
                    name="customersCommercial"
                    placeholder="Enter Number Of Commercial Customers"
                    required
                  />
                </div>

                {/* Other Customers */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of other customers (neither residential nor commercial), measured as a whole number. Ex: 20">
                    <label htmlFor="customersOther">Other Customers</label>
                  </a>
                  <input
                    type="number"
                    id="customersOther"
                    name="customersOther"
                    placeholder="Enter Number Of Other Customers"
                    required
                  />
                </div>

                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total customers, measured as a whole number. Ex: 20">
                    <label htmlFor="customersTotal">Total Customers</label>
                  </a>
                  <input
                    type="number"
                    id="customersTotal"
                    name="customersTotal"
                    placeholder="Total customers"
                    disabled={true}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">Submit</button>
                
              </form>
            )}
          </div>
          )}
        </main>
      </div>

      {/* Styling */}
      <style jsx>{`
      .content-container {
        display: flex;
        flex-direction: column;
        gap: 24px; /* Evenly spaces the sections */
        padding: 20px;
      }

      .sticky-header {
        position: sticky;
        top: 0;
        background-color: white;
        z-index: 10;
        padding: 10px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .tab-container {
        display: flex;
        justify-content: space-around;
        background-color: #f1f1f1;
        padding: 10px 0;
        border-bottom: 2px solid #ccc;
      }

      .tab-button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border: 1px solid #ccc;
        background-color: #fff;
        color: black; /* Inactive tabs are black */
        transition: background-color 0.3s, border-color 0.3s, color 0.3s;
      }

      .tab-button.active {
        background-color: #0070f3;
        color: #fff; /* Active tab is white */
        border-color: #0070f3;
      }

      .tab-button:hover {
        background-color: #eaeaea;
      }

      .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        margin: 0 auto;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .form-container {
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        margin: 0 auto;
      }

      h2 {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
      }

      .simulation-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      label {
        font-size: 1rem;
        font-weight: bold;
      }

      input {
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
      }

      input:focus {
        border-color: #0070f3;
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2);
      }

      .submit-button {
        padding: 10px 20px;
        background-color: #0070f3;
        color: white;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
      }

      .submit-button:hover {
        background-color: #005bb5;
      }

      .loading-animation {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
      }

      .loading-animation p {
        font-size: 1.25rem;
        color: #0070f3;
        font-weight: bold;
      }

      .results {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        font-size: 1.25rem;
      }

      .results p {
        font-weight: bold;
      }

      @media (min-width: 640px) {
        .form-container {
          padding: 30px;
        }

        h2 {
          font-size: 1.75rem;
        }

        input {
          padding: 12px;
        }

        .submit-button {
          padding: 12px 24px;
          font-size: 1.1rem;
        }
      }
        
      `}</style>
    </>
  );
}
