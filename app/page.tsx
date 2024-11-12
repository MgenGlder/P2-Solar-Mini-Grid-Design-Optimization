'use client'

import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

export default function Home() {
  const [state, setState] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({pvSize: '0', batterySize: '0', completed: false});
  const [priceResults, setPriceResults] = useState({
    pvSize: '0',
    batterySize: '0',
    kWhForSite: '0',
    batteryCost: '0',
    batteryInverterCost: '0',
    batteryShippingInverterCost: '0',
    totalCustomerMeterCount: '0',
    meterCostTotal: '0',
    meterShippingCostTotal: '0',
    numberOfPanels: '0',
    siteWattage: '0',
    pricePerPanel: '0',
    pvCost: '0',
    totalShipmentSize: '0',
    portionOfPanelsGoingToProject: '0',
    internationalTransportPerPanel: '0',
    pvShippingCostForThisProject: '0',
    idfFee: '0',
    customsDocumentationFee: '0',
    clearingFeePerShipment: '0',
    EPRAPermit: '0',
    totalCost20ft: '0',
    totalCost40ft: '0',
    completed: false,
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false); 
  const fakeEmail = "email@email.com";
  const fakePassword = "password";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const pvSizeInputValue = parseInt(formData.get('PVSiteWattage') as string);
    const batterySizeInputValue = parseInt(formData.get('BatterykWhAtSite') as string);
    const numBatteries = parseInt(formData.get('numberOfBatteries') as string, 10);
    const kWhPerBattery = parseFloat(formData.get('kWhPerBattery') as string);
    const pricePerBattery = parseFloat(formData.get('pricePerBattery') as string);
    const numBatteryInverters = parseInt(formData.get('numBatteryInverters') as string, 10);
    const batteryInverterPrice = parseFloat(formData.get('batteryInverterPrice') as string);
    const batteryInverterShippingPrice = parseFloat(formData.get('batteryInverterShippingPerKW') as string);
    const batteryInverterSize = parseInt(formData.get('batteryInverterSize') as string, 10);
    
    const countOfSMRSDMeters = parseInt(formData.get('countOfSMRSDMeters') as string, 10);
    const countOfSMRPIMeters = parseInt(formData.get('countOfSMRPIMeters') as string, 10);
    const countOfSM200Es = parseInt(formData.get('countOfSM200Es') as string, 10);
    const smrsdPrice = parseFloat(formData.get('smrsdPrice') as string);
    const smrpiPrice = parseFloat(formData.get('smrpiPrice') as string);
    const sm200ePrice = parseFloat(formData.get('sm200ePrice') as string);
    const baseStationCount = parseInt(formData.get('baseStationCount') as string, 10);
    const sparkMeterBaseStationPrice = parseFloat(formData.get('sparkMeterBaseStationPrice') as string);
    
    const shippingCostPerMeter = parseFloat(formData.get('shippingCostPerMeter') as string);

    const panelSize = parseInt(formData.get('panelSize') as string);
    const numberOfStrings = parseInt(formData.get('numberOfStrings') as string)
    const panelsPerString = parseInt(formData.get('panelsPerString') as string);
    const pricePerWatt = parseFloat(formData.get('pricePerWatt') as string);

    const totalPanelsInShipment = parseInt(formData.get('totalPanelsInShipment') as string);
    const internationalTransportTotal = parseFloat(formData.get('internationalTransportTotal') as string);

    //const inspectionFee = parseFloat(formData.get('preShippingInspectionFee') as string);
    //const projectRacking = parseInt(formData.get('projectsInShipment') as string);
    const kesRate = parseFloat(formData.get('kesRate') as string);
    const VAT = parseFloat(formData.get('vat') as string);

    
    const pvSize = (pvSizeInputValue / 1000).toString();
    const batterySize = batterySizeInputValue.toString();
    
    const kWhForSite = (numBatteries * kWhPerBattery).toFixed(2).toString();
    const batteryCost = (numBatteries * pricePerBattery).toFixed(2).toString();
    
    const batteryInverterCost = (numBatteryInverters * batteryInverterPrice).toFixed(2).toString();
    const batteryShippingInverterCost = (numBatteryInverters * batteryInverterShippingPrice * batteryInverterSize).toFixed(2).toString();
    
    const totalCustomerMeterCount = (countOfSMRSDMeters + countOfSMRPIMeters).toString();
    const meterCostTotal = ((countOfSMRSDMeters * smrsdPrice) + (countOfSMRPIMeters * smrpiPrice) + (countOfSM200Es * sm200ePrice) + (baseStationCount * sparkMeterBaseStationPrice)).toString();
    
    const meterShippingCostTotal = (parseInt(totalCustomerMeterCount) * shippingCostPerMeter).toString()

    const numberOfPanels = (numberOfStrings * panelsPerString).toString()
    const siteWattage = (panelSize * parseInt(numberOfPanels)).toString()
    const pricePerPanel = (panelSize * pricePerWatt).toString()
    const pvCost = (parseInt(numberOfPanels) * parseFloat(pricePerPanel)).toFixed(2).toString()

    const totalShipmentSize = (totalPanelsInShipment * panelSize).toString()
    const portionOfPanelsGoingToProject =  (parseFloat(siteWattage) * parseInt(totalShipmentSize) / 1000).toFixed(2).toString()
    const internationalTransportPerPanel = (internationalTransportTotal / totalPanelsInShipment).toFixed(2).toString()
    const pvShippingCostForThisProject = (parseFloat(internationalTransportPerPanel) * panelsPerString).toFixed(2).toString()

    //const pvInspectionFee = (inspectionFee * kesRate / projectRacking).toFixed(2).toString()
    const idfFee = (20 * kesRate).toFixed(2).toString()
    const customsDocumentationFee = (125 * kesRate).toFixed(2).toString()
    const clearingFeePerShipment = (parseFloat(idfFee) + parseFloat(customsDocumentationFee)).toFixed(2).toString()
    const EPRAPermit = (75 * kesRate).toFixed(2).toString()
    // calc total cost for 20' container
    const thcHandlingCleaningFee20ft = parseInt(formData.get('thcHandlingCleaningFee20ft') as string);
    const shorehandling20ft = parseInt(formData.get('shorehandling20ft') as string);
    const wharfage20ft = parseInt(formData.get('wharfage20ft') as string);
    const freightMovementNairobi20ft = parseInt(formData.get('freightMovementNairobi20ft') as string);
    const kpaPortVerificationCharge20ft = parseInt(formData.get('kpaPortVerificationCharge20ft') as string);
    const kpaFeesReturning20ft = (250 * kesRate)
    const totalCost20ft = (kesRate * (thcHandlingCleaningFee20ft + shorehandling20ft + wharfage20ft + freightMovementNairobi20ft + kpaPortVerificationCharge20ft + kpaFeesReturning20ft) * (1 + VAT)).toFixed(2).toString()
    // calc total cost for 40' container
    const thcHandlingCleaningFee40ft = parseInt(formData.get('thcHandlingCleaningFee40ft') as string);
    const shorehandling40ft = parseInt(formData.get('shorehandling40ft') as string);
    const wharfage40ft = parseInt(formData.get('wharfage40ft') as string);
    const freightMovementNairobi40ft = parseInt(formData.get('freightMovementNairobi40ft') as string);
    const kpaPortVerificationCharge40ft = parseInt(formData.get('kpaPortVerificationCharge40ft') as string);
    const kpaFeesReturning40ft = (350 * kesRate)
    const totalCost40ft = (kesRate * (thcHandlingCleaningFee40ft + shorehandling40ft + wharfage40ft + freightMovementNairobi40ft + kpaPortVerificationCharge40ft + kpaFeesReturning40ft) * (1 + VAT)).toFixed(2).toString()

    
    setTimeout(() => {
      setPriceResults({
        pvSize,
        batterySize,
        kWhForSite,
        batteryCost,
        batteryInverterCost,
        batteryShippingInverterCost,
        totalCustomerMeterCount,
        meterCostTotal,
        meterShippingCostTotal,
        numberOfPanels,
        siteWattage,
        pricePerPanel,
        pvCost,
        totalShipmentSize,
        portionOfPanelsGoingToProject,
        internationalTransportPerPanel,
        pvShippingCostForThisProject,
        idfFee,
        customsDocumentationFee,
        clearingFeePerShipment,
        EPRAPermit,
        totalCost20ft,
        totalCost40ft,
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

  function handleResetPrice(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(false);
    
    
    setPriceResults({
        pvSize: '0',
        batterySize: '0',
        kWhForSite: '0',
        batteryCost: '0',
        batteryInverterCost: '0',
        batteryShippingInverterCost: '0',
        totalCustomerMeterCount: '0',
        meterCostTotal: '0',
        meterShippingCostTotal: '0',
        numberOfPanels: '0',
        siteWattage: '0',
        pricePerPanel: '0',
        pvCost: '0',
        totalShipmentSize: '0',
        portionOfPanelsGoingToProject: '0',
        internationalTransportPerPanel: '0',
        pvShippingCostForThisProject: '0',
        idfFee: '0',
        customsDocumentationFee: '0',
        clearingFeePerShipment: '0',
        EPRAPermit: '0',
        totalCost20ft: '0',
        totalCost40ft: '0',
        completed: false,
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
    } else {
      alert("Incorrect email or password. Please try again.");
    }
  }
  function handleSimulationClick() {
    if (!isAuthenticated) {
      setIsLoginVisible(true);
    } 
    setActiveTab('simulation');
    
  }
  function handleCostClick() {
    if (!isAuthenticated) {
      setIsLoginVisible(true);
    }
    setActiveTab('price');
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
          <button 
            className={`tab-button ${activeTab === 'price' ? 'active' : ''}`} 
            onClick={handleCostClick}
          >
            Cost-Tracking
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
              <h2 className="font-bold">🛠️ Demo!:</h2>
                <div className="video-responsive" style={{display: "block"}}>
                  <a style={{display: "block", textAlign: "center", paddingBottom: "20px"}} href="https://docs.google.com/presentation/d/1VRt0P0QH3UsihzLN1k2JoLLMS2xdAgjDxrZaKJftwyM/edit#slide=id.g2f89acebcd9_1_264">🔗 Click here for the presentation slides! 🔗</a>
                  <iframe style={{margin: "0 auto", width: "100%"}} width="560" height="315" src="https://www.youtube.com/embed/QTgZVbioTrA?si=PHpsE03Q8I6SqCDZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
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
                  <li>Earth - Full-Stack Engineer -  Python, SQL, Java, JS</li>
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

          {activeTab === 'price' && isAuthenticated && (
          <div className="form-container text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] border-thick">
            <Tooltip id="form-tooltip" />
            <h2>Mini-Grid Simulation Parameters</h2>
            <p>Note: Hover over the name of the field for more information!</p>
            <br/>
            {isLoading ? (
              <div className="loading-animation">
                <p>Retrieving results...</p>
              </div>
            ) : (priceResults.completed) ? (
              <div className="results">
                <p>PV Size = {priceResults.pvSize}</p>
                <p>Battery Size = {priceResults.batterySize}</p>
                <p>kWh for this site = {priceResults.kWhForSite}</p>
                <p>Battery Cost = {priceResults.batteryCost}</p>
                <p>Battery Inverter Cost = {priceResults.batteryInverterCost}</p>
                <p>Battery Shipping Inverter Cost = {priceResults.batteryShippingInverterCost}</p>
                <p>Total Customer Meter Count = {priceResults.totalCustomerMeterCount}</p>
                <p>Meter Total Cost = {priceResults.meterCostTotal}</p>
                <p>Shipping Meter Total Cost = {priceResults.meterShippingCostTotal}</p>
                <p>Number of Panels = {priceResults.numberOfPanels}</p>
                <p>Site Wattage = {priceResults.siteWattage}</p>
                <p>Price Per Panel= {priceResults.pricePerPanel}</p>
                <p>Pv Cost = {priceResults.pvCost}</p>
                <p>Total Shipment Size = {priceResults.totalShipmentSize}</p>
                <p>Portion Of Panels Going To Project = {priceResults.portionOfPanelsGoingToProject}</p>
                <p>International Transport Per Panel = {priceResults.internationalTransportPerPanel}</p>
                <p>pv Shipping Cost For This Project = {priceResults.pvShippingCostForThisProject}</p>
                <p>IDF fee = {priceResults.idfFee}</p>
                <p>Customs Documentation Fee = {priceResults.customsDocumentationFee}</p>
                <p>Clearing Fee Per Shipment = {priceResults.clearingFeePerShipment}</p>
                <p>EPRA Permit = {priceResults.EPRAPermit}</p>
                <p>Total Cost 20ft = {priceResults.totalCost20ft}</p>
                <p>Total Cost 40ft = {priceResults.totalCost40ft}</p>
                <form className="reset-form" onSubmit={handleResetPrice}>
                  <button type="submit" className="submit-button">Reset</button>
                </form>
              </div>
            ) : (
              <form className="price-form" onSubmit={handleSubmit}>
                <p>Quick Inputs Section</p>

                {/* Quick Inputs Section*/}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="PV Site Wattage">
                    <label htmlFor="PVSiteWattage">PV Site Wattage</label>
                  </a>
                  <input
                    type="number"
                    id="PVSiteWattage"
                    name="PVSiteWattage"
                    placeholder="PVSiteWattage"
                    value={48600}
                    disabled={false}
                    required
                  />
                </div>
                
                <p>Project Information</p>

                <p>Battery Section</p>
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="The size of the battery in kWh">
                    <label htmlFor="BatterykWhAtSite">Battery Size</label>
                  </a>
                  <input
                    type="number"
                    id="BatterykWhAtSite"
                    name="BatterykWhAtSite"
                    placeholder="Battery Size"
                    value={88.8}
                    disabled={false}
                    required
                  />
                </div>

                {/* Distribution */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Length of distribution lines in km.">
                    <label htmlFor="distributionLength">Distribution Length (km)</label>
                  </a>
                  <input
                    type="number"
                    id="distributionLength"
                    name="distributionLength"
                    placeholder="Enter Distribution Length"
                    value={9}
                    required
                  />
                </div>

                {/* Transmission */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Length of transmission lines in km.">
                    <label htmlFor="transmissionLength">Transmission Length (km)</label>
                  </a>
                  <input
                    type="number"
                    id="transmissionLength"
                    name="transmissionLength"
                    placeholder="Enter Transmission Length"
                    value={1}
                    required
                  />
                </div>

                {/* Number of Customers */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total number of customers served by this project.">
                    <label htmlFor="numCustomers">Number of Customers</label>
                  </a>
                  <input
                    type="number"
                    id="numCustomers"
                    name="numCustomers"
                    placeholder="Enter Number of Customers"
                    value={500}
                    required
                  />
                </div>

                {/* Safety Margin on Budget */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Safety margin applied to entire budget as a percentage.">
                    <label htmlFor="safetyMargin">Safety Margin on Budget (%)</label>
                  </a>
                  <input
                    type="number"
                    id="safetyMargin"
                    name="safetyMargin"
                    placeholder="Enter Safety Margin"
                    value={10}
                    required
                  />
                </div>

                {/* Exchange Rates */}
                <p>Exchange Rates from USD</p>
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Exchange rate for USD.">
                    <label htmlFor="usdRate">$</label>
                  </a>
                  <input
                    type="number"
                    id="usdRate"
                    name="usdRate"
                    placeholder="Enter USD Rate"
                    value={1}
                    required
                  />
                </div>
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Exchange rate for EUR.">
                    <label htmlFor="eurRate">€</label>
                  </a>
                  <input
                    type="number"
                    id="eurRate"
                    name="eurRate"
                    placeholder="Enter EUR Rate"
                    value={0.95}
                    required
                  />
                </div>
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Exchange rate for KES.">
                    <label htmlFor="kesRate">KES</label>
                  </a>
                  <input
                    type="number"
                    id="kesRate"
                    name="kesRate"
                    placeholder="Enter KES Rate"
                    value={150}
                    required
                  />
                </div>
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Exchange rate for NGN.">
                    <label htmlFor="ngnRate">NGN</label>
                  </a>
                  <input
                    type="number"
                    id="ngnRate"
                    name="ngnRate"
                    placeholder="Enter NGN Rate"
                    value={411}
                    required
                  />
                </div>

                {/* Batteries */}
                <p>Batteries</p>

                {/* Number of Batteries */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="The number of batteries required for this project.">
                    <label htmlFor="numberOfBatteries">Number of Batteries</label>
                  </a>
                  <input
                    type="number"
                    id="numberOfBatteries"
                    name="numberOfBatteries"
                    placeholder="Enter Number of Batteries"
                    value={12}
                    required
                  />
                </div>

                {/* kWh per Battery */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Energy capacity of each battery in kWh.">
                    <label htmlFor="kWhPerBattery">kWh per Battery</label>
                  </a>
                  <input
                    type="number"
                    id="kWhPerBattery"
                    name="kWhPerBattery"
                    placeholder="Enter kWh per Battery"
                    value={7.4}
                    required
                  />
                </div>

                {/* Price per Battery */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of a single battery.">
                    <label htmlFor="pricePerBattery">Price per Battery ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pricePerBattery"
                    name="pricePerBattery"
                    placeholder="Enter Price per Battery"
                    value={2200}
                    required
                  />
                </div>

                {/* Lugs per Battery */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of lugs per battery.">
                    <label htmlFor="lugsPerBattery">Lugs per Battery</label>
                  </a>
                  <input
                    type="number"
                    id="lugsPerBattery"
                    name="lugsPerBattery"
                    placeholder="Enter Lugs per Battery"
                    value={4}
                    required
                  />
                </div>

                {/* kWh for this Site */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total energy capacity required for this site in kWh.">
                    <label htmlFor="siteKWh">Total kWh for this Site</label>
                  </a>
                  <input
                    type="number"
                    id="siteKWh"
                    name="siteKWh"
                    placeholder="Total kWh for this Site"
                    value={88.8}
                    disabled={true}
                    required
                  />
                </div>

                {/* Battery Cost (for this Project) */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total cost of batteries for this project.">
                    <label htmlFor="batteryCost">Battery Cost (for this Project)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryCost"
                    name="batteryCost"
                    placeholder="Total Battery Cost"
                    value={26400}
                    disabled={true}
                    required
                  />
                </div>

                {/* Shipping */}
                <p>Shipping</p>

                {/* How Many Sites in Battery Shipment */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of sites included in battery shipment.">
                    <label htmlFor="sitesInBatteryShipment">How Many Sites in Battery Shipment?</label>
                  </a>
                  <input
                    type="number"
                    id="sitesInBatteryShipment"
                    name="sitesInBatteryShipment"
                    placeholder="Enter Number of Sites"
                    value={1}
                    required
                  />
                </div>

                {/* Battery Shipping per kWh */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Shipping cost per kWh for batteries.">
                    <label htmlFor="batteryShippingPerKwh">Battery Shipping per kWh ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryShippingPerKwh"
                    name="batteryShippingPerKwh"
                    placeholder="Enter Battery Shipping per kWh"
                    value={6}
                    required
                  />
                </div>

                {/* Battery Shipping Cost (for this Project) */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Shipping cost for batteries in this project.">
                    <label htmlFor="batteryShippingCost">Battery Shipping Cost (for this Project)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryShippingCost"
                    name="batteryShippingCost"
                    placeholder="Total Battery Shipping Cost"
                    value={532.8}
                    disabled={true}
                    required
                  />
                </div>

                {/* How are the Batteries Shipping? */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Container type for battery shipment.">
                    <label htmlFor="batteryShippingContainer">Battery Shipping Container</label>
                  </a>
                  <input
                    type="text"
                    id="batteryShippingContainer"
                    name="batteryShippingContainer"
                    placeholder="Enter Shipping Container Type"
                    value={"20' Container"}
                    required
                  />
                </div>

                {/* Batteries Shipping with Inverters? */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Whether batteries are shipped with inverters.">
                    <label htmlFor="batteriesShippingWithInverters">Batteries Shipping with Inverters?</label>
                  </a>
                  <input
                    type="checkbox"
                    id="batteriesShippingWithInverters"
                    name="batteriesShippingWithInverters"
                    defaultChecked={false}
                  />
                </div>

                {/* Customs and Clearing */}
                <p>Customs and Clearing</p>

                {/* Battery Inspection Fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="The fee for inspecting batteries at customs.">
                    <label htmlFor="batteryInspectionFee">Battery Inspection Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInspectionFee"
                    name="batteryInspectionFee"
                    placeholder="Battery Inspection Fee"
                    value={37500}
                    disabled={true}
                    required
                  />
                </div>

                {/* Battery Port Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Port fees for the battery shipment.">
                    <label htmlFor="batteryPortFees">Battery Port Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryPortFees"
                    name="batteryPortFees"
                    placeholder="Battery Port Fees"
                    value={212280}
                    disabled={true}
                    required
                  />
                </div>

                {/* Battery Clearing Agent Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Fees charged by clearing agents for battery customs processing.">
                    <label htmlFor="batteryClearingAgentFees">Battery Clearing Agent Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryClearingAgentFees"
                    name="batteryClearingAgentFees"
                    placeholder="Battery Clearing Agent Fees"
                    value={33000}
                    disabled={true}
                    required
                  />
                </div>

                {/* Battery VAT */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Value-added tax on battery imports.">
                    <label htmlFor="batteryVAT">Battery VAT ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryVAT"
                    name="batteryVAT"
                    placeholder="Enter Battery VAT"
                    value={0}
                    required
                  />
                </div>

                {/* Battery Non-VAT Import Taxes */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Other import taxes for batteries that are non-VAT.">
                    <label htmlFor="batteryNonVATImportTaxes">Battery Non-VAT Import Taxes ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryNonVATImportTaxes"
                    name="batteryNonVATImportTaxes"
                    placeholder="Non-VAT Import Taxes"
                    value={223307}
                    disabled={true}
                    required
                  />
                </div>

                {/* Battery Inverters */}
                <p>Battery Inverters</p>

                {/* Number of Battery Inverters for this Site */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="The number of battery inverters required for this site.">
                    <label htmlFor="numBatteryInverters">Number of Battery Inverters</label>
                  </a>
                  <input
                    type="number"
                    id="numBatteryInverters"
                    name="numBatteryInverters"
                    placeholder="Enter Number of Battery Inverters"
                    value={1}
                    required
                  />
                </div>

                {/* Battery Inverter Price */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost per battery inverter.">
                    <label htmlFor="batteryInverterPrice">Battery Inverter Price ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterPrice"
                    name="batteryInverterPrice"
                    placeholder="Enter Battery Inverter Price"
                    value={2600}
                    required
                  />
                </div>

                {/* Battery Inverter Size */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="The power capacity of each battery inverter.">
                    <label htmlFor="batteryInverterSize">Battery Inverter Size (kW)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterSize"
                    name="batteryInverterSize"
                    placeholder="Enter Battery Inverter Size"
                    value={15}
                    required
                  />
                </div>

                {/* Battery Inverter Cost (for this Project) */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total cost of battery inverters for this project.">
                    <label htmlFor="batteryInverterCost">Battery Inverter Cost (for this Project)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterCost"
                    name="batteryInverterCost"
                    placeholder="Total Battery Inverter Cost"
                    value={2600}
                    disabled={true}
                    required
                  />
                </div>

                {/* Shipping */}
                <p>Shipping</p>

                {/* How Many Projects' Battery Inverters in this Shipment */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of projects included in the battery inverter shipment.">
                    <label htmlFor="projectsInBatteryInverterShipment">Projects in Battery Inverter Shipment</label>
                  </a>
                  <input
                    type="number"
                    id="projectsInBatteryInverterShipment"
                    name="projectsInBatteryInverterShipment"
                    placeholder="Enter Number of Projects"
                    value={1}
                    required
                  />
                </div>

                {/* Battery Inverter Shipping Price per kW */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Shipping cost per kW for battery inverters.">
                    <label htmlFor="batteryInverterShippingPerKW">Battery Inverter Shipping Price per kW ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterShippingPerKW"
                    name="batteryInverterShippingPerKW"
                    placeholder="Enter Shipping Price per kW"
                    value={36}
                    required
                  />
                </div>

                {/* Battery Inverter Shipping Cost (for this Project) */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total shipping cost for battery inverters in this project.">
                    <label htmlFor="batteryInverterShippingCost">Battery Inverter Shipping Cost (for this Project)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterShippingCost"
                    name="batteryInverterShippingCost"
                    placeholder="Total Shipping Cost"
                    value={540}
                    disabled={true}
                    required
                  />
                </div>

                {/* How are the Battery Inverters Shipping? */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Container type for battery inverter shipment.">
                    <label htmlFor="batteryInverterShippingContainer">Battery Inverter Shipping Container</label>
                  </a>
                  <input
                    type="text"
                    id="batteryInverterShippingContainer"
                    name="batteryInverterShippingContainer"
                    placeholder="Enter Shipping Container Type"
                    value={"20' Container"}
                    required
                  />
                </div>

                {/* Customs and Clearing */}
                <p>Customs and Clearing</p>

                {/* Battery Inverter Inspection Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Inspection fees for battery inverters at customs.">
                    <label htmlFor="batteryInverterInspectionFees">Battery Inverter Inspection Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterInspectionFees"
                    name="batteryInverterInspectionFees"
                    placeholder="Battery Inverter Inspection Fees"
                    value={37500}
                    disabled={true}
                    required
                  />
                </div>

                {/* Battery Inverter Port Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Port fees for battery inverter shipment.">
                    <label htmlFor="batteryInverterPortFees">Battery Inverter Port Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterPortFees"
                    name="batteryInverterPortFees"
                    placeholder="Battery Inverter Port Fees"
                    value={212280}
                    disabled={true}
                    required
                  />
                </div>

                {/* Battery Inverter Clearing Agent Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Fees charged by clearing agents for battery inverter customs processing.">
                    <label htmlFor="batteryInverterClearingAgentFees">Battery Inverter Clearing Agent Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterClearingAgentFees"
                    name="batteryInverterClearingAgentFees"
                    placeholder="Battery Inverter Clearing Agent Fees"
                    value={33000}
                    disabled={true}
                    required
                  />
                </div>

                {/* Battery Inverter VAT */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Value-added tax on battery inverter imports.">
                    <label htmlFor="batteryInverterVAT">Battery Inverter VAT ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterVAT"
                    name="batteryInverterVAT"
                    placeholder="Battery Inverter VAT"
                    value={0}
                    disabled={true}
                    required
                  />
                </div>

                {/* Battery Inverter Non-VAT Import Taxes */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Other import taxes for battery inverters that are non-VAT.">
                    <label htmlFor="batteryInverterNonVATImportTaxes">Battery Inverter Non-VAT Import Taxes ($)</label>
                  </a>
                  <input
                    type="number"
                    id="batteryInverterNonVATImportTaxes"
                    name="batteryInverterNonVATImportTaxes"
                    placeholder="Non-VAT Import Taxes"
                    value={26035}
                    disabled={true}
                    required
                  />
                </div>

                {/* Distribution */}
                <p>Distribution</p>

                {/* Are you building distribution lines? */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Indicate whether distribution lines are being built.">
                    <label htmlFor="buildingDistributionLines">Are you building distribution lines?</label>
                  </a>
                  <select
                    id="buildingDistributionLines"
                    name="buildingDistributionLines"
                    required
                  >
                    <option value="TRUE">Yes</option>
                    <option value="FALSE">No</option>
                  </select>
                </div>

                {/* Distribution Surveyor Cost */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of hiring a surveyor for the distribution project.">
                    <label htmlFor="distributionSurveyorCost">Distribution Surveyor Cost ($)</label>
                  </a>
                  <input
                    type="number"
                    id="distributionSurveyorCost"
                    name="distributionSurveyorCost"
                    placeholder="Enter Distribution Surveyor Cost"
                    value={60000}
                    required
                  />
                </div>

                {/* Materials Cost per km */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of materials required per kilometer for distribution lines.">
                    <label htmlFor="materialsCostPerKm">Materials Cost per km ($)</label>
                  </a>
                  <input
                    type="number"
                    id="materialsCostPerKm"
                    name="materialsCostPerKm"
                    placeholder="Enter Materials Cost per km"
                    value={554000}
                    required
                  />
                </div>

                {/* Labour Cost per km */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of labor required per kilometer for distribution lines.">
                    <label htmlFor="labourCostPerKm">Labour Cost per km ($)</label>
                  </a>
                  <input
                    type="number"
                    id="labourCostPerKm"
                    name="labourCostPerKm"
                    placeholder="Enter Labour Cost per km"
                    value={200000}
                    required
                  />
                </div>

                {/* Transport Cost per km */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of transporting materials per kilometer.">
                    <label htmlFor="transportCostPerKm">Transport Cost per km ($)</label>
                  </a>
                  <input
                    type="number"
                    id="transportCostPerKm"
                    name="transportCostPerKm"
                    placeholder="Enter Transport Cost per km"
                    value={100000}
                    required
                  />
                </div>

                {/* Contingency */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Contingency fund as a percentage of the total distribution project cost.">
                    <label htmlFor="contingency">Contingency (%)</label>
                  </a>
                  <input
                    type="number"
                    id="contingency"
                    name="contingency"
                    placeholder="Enter Contingency Percentage"
                    value={10}
                    required
                  />
                </div>

                {/* Fencing */}
                <p>Fencing</p>

                {/* Fencing Length */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Length of fencing required for the project, measured in meters.">
                    <label htmlFor="fencingLength">Fencing Length (m)</label>
                  </a>
                  <input
                    type="number"
                    id="fencingLength"
                    name="fencingLength"
                    placeholder="Enter Fencing Length"
                    value={120}
                    required
                  />
                </div>

                {/* Fencing Labour per Meter */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of labor required per meter of fencing.">
                    <label htmlFor="fencingLabourPerMeter">Fencing Labour per Meter ($)</label>
                  </a>
                  <input
                    type="number"
                    id="fencingLabourPerMeter"
                    name="fencingLabourPerMeter"
                    placeholder="Enter Fencing Labour Cost per Meter"
                    value={250}
                    required
                  />
                </div>

                {/* Fencing Materials per Meter */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of fencing materials required per meter.">
                    <label htmlFor="fencingMaterialsPerMeter">Fencing Materials per Meter ($)</label>
                  </a>
                  <input
                    type="number"
                    id="fencingMaterialsPerMeter"
                    name="fencingMaterialsPerMeter"
                    placeholder="Enter Fencing Materials Cost per Meter"
                    value={1000}
                    required
                  />
                </div>

                {/* Fencing Materials Transport per Meter */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost to transport fencing materials per meter.">
                    <label htmlFor="fencingMaterialsTransportPerMeter">Fencing Materials Transport per Meter ($)</label>
                  </a>
                  <input
                    type="number"
                    id="fencingMaterialsTransportPerMeter"
                    name="fencingMaterialsTransportPerMeter"
                    placeholder="Enter Fencing Materials Transport Cost per Meter"
                    value={100}
                    required
                  />
                </div>


                {/* Meters */}
                <p>Meters</p>

                {/* Materials */}
                <p>Materials</p>

                {/* How many sites in order? */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of sites included in this order.">
                    <label htmlFor="sitesInOrder">How many sites in order?</label>
                  </a>
                  <input
                    type="number"
                    id="sitesInOrder"
                    name="sitesInOrder"
                    placeholder="Enter Number of Sites in Order"
                    value={1}
                    required
                  />
                </div>

                {/* Count of SMRSD Meters */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total number of SMRSD meters required for the project.">
                    <label htmlFor="countOfSMRSDMeters">Count of SMRSD Meters</label>
                  </a>
                  <input
                    type="number"
                    id="countOfSMRSDMeters"
                    name="countOfSMRSDMeters"
                    placeholder="Enter Count of SMRSD Meters"
                    value={504}
                    required
                  />
                </div>

                {/* Count of SMRPI Meters */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total number of SMRPI meters required for the project.">
                    <label htmlFor="countOfSMRPIMeters">Count of SMRPI Meters</label>
                  </a>
                  <input
                    type="number"
                    id="countOfSMRPIMeters"
                    name="countOfSMRPIMeters"
                    placeholder="Enter Count of SMRPI Meters"
                    value={0}
                    required
                  />
                </div>

                {/* Total Customer Meter Count */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total number of customer meters for the project.">
                    <label htmlFor="totalCustomerMeterCount">Total Customer Meter Count</label>
                  </a>
                  <input
                    type="number"
                    id="totalCustomerMeterCount"
                    name="totalCustomerMeterCount"
                    placeholder="Total Customer Meter Count"
                    value={504}
                    disabled={true}
                    required
                  />
                </div>

                {/* Count of SM200Es */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Count of SM200E meters required for the project.">
                    <label htmlFor="countOfSM200Es">Count of SM200Es</label>
                  </a>
                  <input
                    type="number"
                    id="countOfSM200Es"
                    name="countOfSM200Es"
                    placeholder="Enter Count of SM200Es"
                    value={1}
                    required
                  />
                </div>

                {/* SMRSD Price */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost per SMRSD meter.">
                    <label htmlFor="smrsdPrice">SMRSD Price ($)</label>
                  </a>
                  <input
                    type="number"
                    id="smrsdPrice"
                    name="smrsdPrice"
                    placeholder="Enter SMRSD Price"
                    value={40}
                    required
                  />
                </div>

                {/* SMRPI Price */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost per SMRPI meter.">
                    <label htmlFor="smrpiPrice">SMRPI Price ($)</label>
                  </a>
                  <input
                    type="number"
                    id="smrpiPrice"
                    name="smrpiPrice"
                    placeholder="Enter SMRPI Price"
                    value={100}
                    required
                  />
                </div>

                {/* SM200E Price */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost per SM200E meter.">
                    <label htmlFor="sm200ePrice">SM200E Price ($)</label>
                  </a>
                  <input
                    type="number"
                    id="sm200ePrice"
                    name="sm200ePrice"
                    placeholder="Enter SM200E Price"
                    value={150}
                    required
                  />
                </div>

                {/* Base Station Count */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Count of base stations required for the project.">
                    <label htmlFor="baseStationCount">Base Station Count</label>
                  </a>
                  <input
                    type="number"
                    id="baseStationCount"
                    name="baseStationCount"
                    placeholder="Enter Base Station Count"
                    value={1}
                    required
                  />
                </div>

                {/* Modem Count */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Count of modems required for the project.">
                    <label htmlFor="modemCount">Modem Count</label>
                  </a>
                  <input
                    type="number"
                    id="modemCount"
                    name="modemCount"
                    placeholder="Enter Modem Count"
                    value={1}
                    required
                  />
                </div>

                {/* SparkMeter Base Station Price */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of SparkMeter base station.">
                    <label htmlFor="sparkMeterBaseStationPrice">SparkMeter Base Station Price ($)</label>
                  </a>
                  <input
                    type="number"
                    id="sparkMeterBaseStationPrice"
                    name="sparkMeterBaseStationPrice"
                    placeholder="Enter SparkMeter Base Station Price"
                    value={1050}
                    required
                  />
                </div>

                {/* Meter Cost Total */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total cost of meters for this project.">
                    <label htmlFor="meterCostTotal">Meter Cost Total ($)</label>
                  </a>
                  <input
                    type="number"
                    id="meterCostTotal"
                    name="meterCostTotal"
                    placeholder="Meter Cost Total"
                    value={21360}
                    disabled={true}
                    required
                  />
                </div>

                {/* Shipping Cost per Meter */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Shipping cost per meter.">
                    <label htmlFor="shippingCostPerMeter">Shipping Cost per Meter ($)</label>
                  </a>
                  <input
                    type="number"
                    id="shippingCostPerMeter"
                    name="shippingCostPerMeter"
                    placeholder="Enter Shipping Cost per Meter"
                    value={5.48}
                    required
                  />
                </div>

                {/* Total Meter Shipping Cost */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total cost of shipping meters for the project.">
                    <label htmlFor="totalMeterShippingCost">Total Meter Shipping Cost ($)</label>
                  </a>
                  <input
                    type="number"
                    id="totalMeterShippingCost"
                    name="totalMeterShippingCost"
                    placeholder="Total Meter Shipping Cost"
                    value={2761.92}
                    disabled={true}
                    required
                  />
                </div>


                {/* Customs and Clearing */}
                <p>Customs and Clearing</p>

                {/* Meter Inspection Fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Inspection fee for the meters.">
                    <label htmlFor="meterInspectionFee">Meter Inspection Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="meterInspectionFee"
                    name="meterInspectionFee"
                    placeholder="Meter Inspection Fee"
                    value={37500}
                    disabled={true}
                    required
                  />
                </div>

                {/* Meter Port Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Port fees for the meters.">
                    <label htmlFor="meterPortFees">Meter Port Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="meterPortFees"
                    name="meterPortFees"
                    placeholder="Enter Meter Port Fees"
                    value={30000}
                    required
                  />
                </div>

                {/* Meter Clearing Agent Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Clearing agent fees for the meters.">
                    <label htmlFor="meterClearingAgentFees">Meter Clearing Agent Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="meterClearingAgentFees"
                    name="meterClearingAgentFees"
                    placeholder="Meter Clearing Agent Fees"
                    value={21750}
                    disabled={true}
                    required
                  />
                </div>

                {/* Meter VAT */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Value-added tax (VAT) on meters.">
                    <label htmlFor="meterVAT">Meter VAT ($)</label>
                  </a>
                  <input
                    type="number"
                    id="meterVAT"
                    name="meterVAT"
                    placeholder="Meter VAT"
                    value={512640}
                    disabled={true}
                    required
                  />
                </div>

                {/* Meter Non-VAT Import Taxes */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Non-VAT import taxes on meters.">
                    <label htmlFor="meterNonVATImportTaxes">Meter Non-VAT Import Taxes ($)</label>
                  </a>
                  <input
                    type="number"
                    id="meterNonVATImportTaxes"
                    name="meterNonVATImportTaxes"
                    placeholder="Meter Non-VAT Import Taxes"
                    value={177101}
                    disabled={true}
                    required
                  />
                </div>

                {/* PV */}
                <p>PV</p>

                {/* Materials */}
                <p>Materials</p>

                {/* Panel Size */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Size of each solar panel in watts.">
                    <label htmlFor="panelSize">Panel Size (W)</label>
                  </a>
                  <input
                    type="number"
                    id="panelSize"
                    name="panelSize"
                    placeholder="Enter Panel Size"
                    value={540}
                    required
                  />
                </div>

                {/* Number of Strings */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total number of strings in the PV setup.">
                    <label htmlFor="numberOfStrings">Number of Strings</label>
                  </a>
                  <input
                    type="number"
                    id="numberOfStrings"
                    name="numberOfStrings"
                    placeholder="Enter Number of Strings"
                    value={30}
                    required
                  />
                </div>

                {/* Panels per String */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of panels in each string.">
                    <label htmlFor="panelsPerString">Panels per String</label>
                  </a>
                  <input
                    type="number"
                    id="panelsPerString"
                    name="panelsPerString"
                    placeholder="Panels per String"
                    value={3}
                    disabled={false}
                    required
                  />
                </div>

                {/* Number of Panels for this Project */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total number of panels for this project.">
                    <label htmlFor="numberOfPanels">Number of Panels (for this project)</label>
                  </a>
                  <input
                    type="number"
                    id="numberOfPanels"
                    name="numberOfPanels"
                    placeholder="Number of Panels"
                    value={90}
                    disabled={true}
                    required
                  />
                </div>

                {/* Site Wattage */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total wattage for the site.">
                    <label htmlFor="siteWattage">Site Wattage (W)</label>
                  </a>
                  <input
                    type="number"
                    id="siteWattage"
                    name="siteWattage"
                    placeholder="Site Wattage"
                    value={48600}
                    disabled={true}
                    required
                  />
                </div>

                {/* Price per Watt */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost per watt of the PV setup.">
                    <label htmlFor="pricePerWatt">Price per Watt ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pricePerWatt"
                    name="pricePerWatt"
                    placeholder="Enter Price per Watt"
                    value={0.273}
                    required
                  />
                </div>

                {/* Price per Panel */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost per solar panel.">
                    <label htmlFor="pricePerPanel">Price per Panel ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pricePerPanel"
                    name="pricePerPanel"
                    placeholder="Price per Panel"
                    value={147.42}
                    disabled={true}
                    required
                  />
                </div>

                {/* PV Cost for this Project */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total cost of the PV setup for this project.">
                    <label htmlFor="pvCostForThisProject">PV Cost (for this project) ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pvCostForThisProject"
                    name="pvCostForThisProject"
                    placeholder="PV Cost"
                    value={13267.8}
                    disabled={true}
                    required
                  />
                </div>

                {/* Shipping */}
                <p>Shipping</p>

                {/* Total Panels in Shipment */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total number of panels in the shipment.">
                    <label htmlFor="totalPanelsInShipment">Total Panels in Shipment</label>
                  </a>
                  <input
                    type="number"
                    id="totalPanelsInShipment"
                    name="totalPanelsInShipment"
                    placeholder="Enter Total Panels in Shipment"
                    value={620}
                    required
                  />
                </div>

                {/* Total Shipment Size */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total size of the shipment in cubic meters.">
                    <label htmlFor="totalShipmentSize">Total Shipment Size (m³)</label>
                  </a>
                  <input
                    type="number"
                    id="totalShipmentSize"
                    name="totalShipmentSize"
                    placeholder="Total Shipment Size"
                    value={334.8}
                    disabled={true}
                    required
                  />
                </div>

                {/* Portion of Panels Going to this Project */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Percentage of panels in the shipment going to this project.">
                    <label htmlFor="portionOfPanelsGoingToProject">Portion of Panels Going to this Project (%)</label>
                  </a>
                  <input
                    type="number"
                    id="portionOfPanelsGoingToProject"
                    name="portionOfPanelsGoingToProject"
                    placeholder="Enter Portion of Panels Going to Project"
                    value={15}
                    required
                  />
                </div>

                {/* International Transport Total */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total cost for international transport of the shipment.">
                    <label htmlFor="internationalTransportTotal">International Transport Total ($)</label>
                  </a>
                  <input
                    type="number"
                    id="internationalTransportTotal"
                    name="internationalTransportTotal"
                    placeholder="Enter International Transport Total"
                    value={4000}
                    required
                  />
                </div>

                {/* International Transport per Panel */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost for international transport per panel.">
                    <label htmlFor="internationalTransportPerPanel">International Transport per Panel ($)</label>
                  </a>
                  <input
                    type="number"
                    id="internationalTransportPerPanel"
                    name="internationalTransportPerPanel"
                    placeholder="International Transport per Panel"
                    value={6.45}
                    disabled={true}
                    required
                  />
                </div>

                {/* PV Shipping Cost for this Project */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total shipping cost for PV panels in this project.">
                    <label htmlFor="pvShippingCostForThisProject">PV Shipping Cost (for this project) ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pvShippingCostForThisProject"
                    name="pvShippingCostForThisProject"
                    placeholder="PV Shipping Cost"
                    value={580.65}
                    disabled={true}
                    required
                  />
                </div>

                {/* How are the Panels Shipping? */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Method of shipping for the panels.">
                    <label htmlFor="howArePanelsShipping">How are the Panels Shipping?</label>
                  </a>
                  <input
                    type="text"
                    id="howArePanelsShipping"
                    name="howArePanelsShipping"
                    placeholder="Enter Shipping Method"
                    value={"20' Container"}
                    required
                  />
                </div>

                {/* Customs and Clearing */}
                <p>Customs and Clearing</p>

                {/* PV Inspection Fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Inspection fee for the PV setup.">
                    <label htmlFor="pvInspectionFee">PV Inspection Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pvInspectionFee"
                    name="pvInspectionFee"
                    placeholder="PV Inspection Fee"
                    value={5444}
                    disabled={true}
                    required
                  />
                </div>

                {/* PV Port Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Port fees for the PV setup.">
                    <label htmlFor="pvPortFees">PV Port Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pvPortFees"
                    name="pvPortFees"
                    placeholder="PV Port Fees"
                    value={30815}
                    disabled={true}
                    required
                  />
                </div>

                {/* PV Clearing Agent Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Clearing agent fees for the PV setup.">
                    <label htmlFor="pvClearingAgentFees">PV Clearing Agent Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pvClearingAgentFees"
                    name="pvClearingAgentFees"
                    placeholder="PV Clearing Agent Fees"
                    value={4790}
                    disabled={true}
                    required
                  />
                </div>

                {/* PV VAT */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Value-added tax applicable to the PV setup.">
                    <label htmlFor="pvVAT">PV VAT (%)</label>
                  </a>
                  <input
                    type="number"
                    id="pvVAT"
                    name="pvVAT"
                    placeholder="PV VAT"
                    value={0}
                    disabled={true}
                    required
                  />
                </div>

                {/* PV Non-VAT Import Taxes */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Non-VAT import taxes applicable to the PV setup.">
                    <label htmlFor="pvNonVATImportTaxes">PV Non-VAT Import Taxes ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pvNonVATImportTaxes"
                    name="pvNonVATImportTaxes"
                    placeholder="PV Non-VAT Import Taxes"
                    value={114821}
                    disabled={true}
                    required
                  />
                </div>

                {/* PV Inverters/Charger Controllers */}
                <p>PV Inverters/Charger Controllers</p>

                {/* Sites in Shipment */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of sites included in the shipment.">
                    <label htmlFor="sitesInShipment">Sites in Shipment</label>
                  </a>
                  <input
                    type="number"
                    id="sitesInShipment"
                    name="sitesInShipment"
                    placeholder="Enter Number of Sites"
                    value={1}
                    required
                  />
                </div>

                {/* Price per Inverter/Charger */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of each inverter or charger.">
                    <label htmlFor="pricePerInverterCharger">Price per Inverter/Charger ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pricePerInverterCharger"
                    name="pricePerInverterCharger"
                    placeholder="Enter Price per Inverter/Charger"
                    value={588.88}
                    required
                  />
                </div>

                {/* Count of PV Inverters/Charge Controllers */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total number of PV inverters or charge controllers.">
                    <label htmlFor="countPVInverters">Count of PV Inverters/Charge Controllers</label>
                  </a>
                  <input
                    type="number"
                    id="countPVInverters"
                    name="countPVInverters"
                    placeholder="Enter Count of Inverters/Charge Controllers"
                    value={10}
                    required
                  />
                </div>

                {/* PV Inverter/Charge Controller Cost */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total cost for the PV inverters/charge controllers.">
                    <label htmlFor="pvInverterCost">PV Inverter/Charge Controller Cost ($)</label>
                  </a>
                  <input
                    type="number"
                    id="pvInverterCost"
                    name="pvInverterCost"
                    placeholder="PV Inverter Cost"
                    value={5888.8}
                    disabled={true}
                    required
                  />
                </div>

                {/* Shipping Cost */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Shipping cost associated with the inverters/chargers.">
                    <label htmlFor="shippingCost">Shipping Cost ($)</label>
                  </a>
                  <input
                    type="number"
                    id="shippingCost"
                    name="shippingCost"
                    placeholder="Enter Shipping Cost"
                    value={0}
                    required
                  />
                </div>

                {/* Racking */}
                <p>Racking</p>

                {/* Materials and Labour */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Materials and labor costs for racking per watt.">
                    <label htmlFor="materialsPricePerW">Materials Price per W ($)</label>
                  </a>
                  <input
                    type="number"
                    id="materialsPricePerW"
                    name="materialsPricePerW"
                    placeholder="Enter Materials Price per W"
                    value={0.05}
                    required
                  />
                </div>

                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Labor costs for racking per watt.">
                    <label htmlFor="labourPricePerW">Labour Price per W ($)</label>
                  </a>
                  <input
                    type="number"
                    id="labourPricePerW"
                    name="labourPricePerW"
                    placeholder="Enter Labour Price per W"
                    value={0.01}
                    required
                  />
                </div>

                {/* Racking Materials Cost */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total cost of racking materials.">
                    <label htmlFor="rackingMaterialsCost">Racking Materials Cost ($)</label>
                  </a>
                  <input
                    type="number"
                    id="rackingMaterialsCost"
                    name="rackingMaterialsCost"
                    placeholder="Racking Materials Cost"
                    value={2430}
                    disabled={true}
                    required
                  />
                </div>

                {/* Shipping */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Shipping cost for racking materials.">
                    <label htmlFor="rackingShippingCost">Racking Shipping Cost ($)</label>
                  </a>
                  <input
                    type="number"
                    id="rackingShippingCost"
                    name="rackingShippingCost"
                    placeholder="Racking Shipping Cost"
                    value={8000}
                    disabled={true}
                    required
                  />
                </div>

                {/* Projects' Racking in Shipment */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of projects included in the racking shipment.">
                    <label htmlFor="projectsInShipment">How Many Projects Racking is in this Shipment?</label>
                  </a>
                  <input
                    type="number"
                    id="projectsInShipment"
                    name="projectsInShipment"
                    placeholder="Enter Number of Projects"
                    value={1}
                    required
                  />
                </div>

                {/* How is the Racking Shipping */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Method of shipping for racking.">
                    <label htmlFor="rackingShippingMethod">How is the Racking Shipping?</label>
                  </a>
                  <input
                    type="text"
                    id="rackingShippingMethod"
                    name="rackingShippingMethod"
                    placeholder="Enter Racking Shipping Method"
                    value={"20' Container"}
                    required
                  />
                </div>

                {/* Customs and Clearing */}
                <p>Customs and Clearing</p>

                {/* Racking Inspection Fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Inspection fee for the racking setup.">
                    <label htmlFor="rackingInspectionFee">Racking Inspection Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="rackingInspectionFee"
                    name="rackingInspectionFee"
                    placeholder="Racking Inspection Fee"
                    value={37500}
                    disabled={true}
                    required
                  />
                </div>

                {/* Racking Port Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Port fees for the racking setup.">
                    <label htmlFor="rackingPortFees">Racking Port Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="rackingPortFees"
                    name="rackingPortFees"
                    placeholder="Racking Port Fees"
                    value={212280}
                    disabled={true}
                    required
                  />
                </div>

                {/* Racking Clearing Agent Fees */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Clearing agent fees for the racking setup.">
                    <label htmlFor="rackingClearingAgentFees">Racking Clearing Agent Fees ($)</label>
                  </a>
                  <input
                    type="number"
                    id="rackingClearingAgentFees"
                    name="rackingClearingAgentFees"
                    placeholder="Racking Clearing Agent Fees"
                    value={21750}
                    disabled={true}
                    required
                  />
                </div>

                {/* Racking VAT */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Value-added tax applicable to the racking setup.">
                    <label htmlFor="rackingVAT">Racking VAT (%)</label>
                  </a>
                  <input
                    type="number"
                    id="rackingVAT"
                    name="rackingVAT"
                    placeholder="Racking VAT"
                    value={314465}
                    disabled={true}
                    required
                  />
                </div>

                {/* Racking Non-VAT Import Taxes */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Non-VAT import taxes applicable to the racking setup.">
                    <label htmlFor="rackingNonVATImportTaxes">Racking Non-VAT Import Taxes ($)</label>
                  </a>
                  <input
                    type="number"
                    id="rackingNonVATImportTaxes"
                    name="rackingNonVATImportTaxes"
                    placeholder="Racking Non-VAT Import Taxes"
                    value={479558}
                    disabled={true}
                    required
                  />
                </div>

                {/* Logistics */}
                <p>Logistics</p>

                {/* International Shipping */}
                <p>International Shipping</p>

                {/* Pre-Shipping Inspection Fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Fee for pre-shipping inspection (SGS/BV/IT).">
                    <label htmlFor="preShippingInspectionFee">Pre-Shipping Inspection Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="preShippingInspectionFee"
                    name="preShippingInspectionFee"
                    placeholder="Enter Pre-Shipping Inspection Fee"
                    value={250}
                    required
                  />
                </div>

                {/* Shipping Insurance Rate Estimate */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Estimated insurance rate for shipping.">
                    <label htmlFor="insuranceRateEstimate">Insurance Rate Estimate (%)</label>
                  </a>
                  <input
                    type="number"
                    id="insuranceRateEstimate"
                    name="insuranceRateEstimate"
                    placeholder="Enter Insurance Rate Estimate"
                    value={0.5}
                    required
                  />
                </div>

                {/* Clearing Agents */}
                <p>Clearing Agents</p>

                {/* IDF Fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Fee for IDF clearance.">
                    <label htmlFor="idfFee">IDF Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="idfFee"
                    name="idfFee"
                    placeholder="Enter IDF Fee"
                    value={3000}
                    required
                  />
                </div>

                {/* Customs Documentation and Agency Fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Fee for customs documentation and agency services.">
                    <label htmlFor="customsDocumentationFee">Customs Documentation and Agency Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="customsDocumentationFee"
                    name="customsDocumentationFee"
                    placeholder="Enter Customs Documentation Fee"
                    value={18750}
                    required
                  />
                </div>

                {/* Clearing Agent Fees per Shipment */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Clearing agent fees charged for each shipment.">
                    <label htmlFor="clearingAgentFees">Clearing Agent Fees per Shipment ($)</label>
                  </a>
                  <input
                    type="number"
                    id="clearingAgentFees"
                    name="clearingAgentFees"
                    placeholder="Clearing Agent Fees"
                    value={21750}
                    disabled={true}
                    required
                  />
                </div>

                {/* EPRA Permit Processing Fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Processing fee for EPRA permits related to PV, batteries, and inverters.">
                    <label htmlFor="epraPermitProcessingFee">EPRA Permit Processing Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="epraPermitProcessingFee"
                    name="epraPermitProcessingFee"
                    placeholder="Enter EPRA Permit Processing Fee"
                    value={11250}
                    required
                  />
                </div>

                {/* Port and Shipping Line */}
                <p>Port and Shipping Line</p>

                {/* Delivery Order Fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Fee for delivery orders at the port.">
                    <label htmlFor="deliveryOrderFee">Delivery Order Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="deliveryOrderFee"
                    name="deliveryOrderFee"
                    placeholder="Enter Delivery Order Fee"
                    value={70}
                    required
                  />
                </div>

                {/* 20' Container Costs */}
                <p>20 Container</p>

                {/* THC/Handling/Cleaning Fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Handling and cleaning fees for 20' containers.">
                    <label htmlFor="thcHandlingCleaningFee20ft">THC/Handling/Cleaning Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="thcHandlingCleaningFee20ft"
                    name="thcHandlingCleaningFee20ft"
                    placeholder="Enter THC/Handling/Cleaning Fee"
                    value={170}
                    required
                  />
                </div>

                {/* Shorehandling */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost for shorehandling of 20' containers.">
                    <label htmlFor="shorehandling20ft">Shorehandling ($)</label>
                  </a>
                  <input
                    type="number"
                    id="shorehandling20ft"
                    name="shorehandling20ft"
                    placeholder="Enter Shorehandling Cost"
                    value={150}
                    required
                  />
                </div>

                {/* Wharfage */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Wharfage costs for 20' containers.">
                    <label htmlFor="wharfage20ft">Wharfage ($)</label>
                  </a>
                  <input
                    type="number"
                    id="wharfage20ft"
                    name="wharfage20ft"
                    placeholder="Enter Wharfage Cost"
                    value={0}
                    required
                  />
                </div>

                {/* Freight Movement to Nairobi on SGR */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost for freight movement to Nairobi.">
                    <label htmlFor="freightMovementNairobi20ft">Freight Movement to Nairobi on SGR ($)</label>
                  </a>
                  <input
                    type="number"
                    id="freightMovementNairobi20ft"
                    name="freightMovementNairobi20ft"
                    placeholder="Enter Freight Movement Cost"
                    value={500}
                    required
                  />
                </div>

                {/* KPA Port Verification Charge */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Charge for port verification.">
                    <label htmlFor="kpaPortVerificationCharge20ft">KPA Port Verification Charge ($)</label>
                  </a>
                  <input
                    type="number"
                    id="kpaPortVerificationCharge20ft"
                    name="kpaPortVerificationCharge20ft"
                    placeholder="Enter KPA Port Verification Charge"
                    value={80}
                    required
                  />
                </div>

                {/* KPA Fees for Bringing Container Back to Mombasa */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Fees for returning the container to Mombasa.">
                    <label htmlFor="kpaFeesReturning20ft">KPA Fees for Bringing Container Back to Mombasa ($)</label>
                  </a>
                  <input
                    type="number"
                    id="kpaFeesReturning20ft"
                    name="kpaFeesReturning20ft"
                    placeholder="Enter KPA Fees Returning Cost"
                    value={37500}
                    required
                  />
                </div>

                {/* Total for 20' Container */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total cost for the 20' container.">
                    <label htmlFor="total20ftContainer">Total for 20 Container ($)</label>
                  </a>
                  <input
                    type="number"
                    id="total20ftContainer"
                    name="total20ftContainer"
                    placeholder="Total for 20' Container"
                    value={212280}
                    disabled={true}
                    required
                  />
                </div>

                {/* 40' Container Costs */}
                <p>40 Container</p>

                {/* THC/Handling/Cleaning Fee for 40' Container */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Handling and cleaning fees for 40' containers.">
                    <label htmlFor="thcHandlingCleaningFee40ft">THC/Handling/Cleaning Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="thcHandlingCleaningFee40ft"
                    name="thcHandlingCleaningFee40ft"
                    placeholder="Enter THC/Handling/Cleaning Fee"
                    value={230}
                    required
                  />
                </div>

                {/* Shorehandling for 40' Container */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost for shorehandling of 40' containers.">
                    <label htmlFor="shorehandling40ft">Shorehandling ($)</label>
                  </a>
                  <input
                    type="number"
                    id="shorehandling40ft"
                    name="shorehandling40ft"
                    placeholder="Enter Shorehandling Cost"
                    value={225}
                    required
                  />
                </div>

                {/* Wharfage for 40' Container */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Wharfage costs for 40' containers.">
                    <label htmlFor="wharfage40ft">Wharfage ($)</label>
                  </a>
                  <input
                    type="number"
                    id="wharfage40ft"
                    name="wharfage40ft"
                    placeholder="Enter Wharfage Cost"
                    value={0}
                    required
                  />
                </div>

                {/* Freight Movement to Nairobi on SGR for 40' Container */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost for freight movement to Nairobi for 40' containers.">
                    <label htmlFor="freightMovementNairobi40ft">Freight Movement to Nairobi on SGR ($)</label>
                  </a>
                  <input
                    type="number"
                    id="freightMovementNairobi40ft"
                    name="freightMovementNairobi40ft"
                    placeholder="Enter Freight Movement Cost"
                    value={1000}
                    required
                  />
                </div>

                {/* KPA Port Verification Charge for 40' Container */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Charge for port verification for 40' containers.">
                    <label htmlFor="kpaPortVerificationCharge40ft">KPA Port Verification Charge ($)</label>
                  </a>
                  <input
                    type="number"
                    id="kpaPortVerificationCharge40ft"
                    name="kpaPortVerificationCharge40ft"
                    placeholder="Enter KPA Port Verification Charge"
                    value={100}
                    required
                  />
                </div>

                {/* KPA Fees for Bringing Container Back to Mombasa for 40' Container */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Fees for returning the 40' container to Mombasa.">
                    <label htmlFor="kpaFeesReturning40ft">KPA Fees for Bringing Container Back to Mombasa ($)</label>
                  </a>
                  <input
                    type="number"
                    id="kpaFeesReturning40ft"
                    name="kpaFeesReturning40ft"
                    placeholder="Enter KPA Fees Returning Cost"
                    value={75000}
                    required
                  />
                </div>

                {/* Total for 40' Container */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Total cost for the 40' container.">
                    <label htmlFor="total40ftContainer">Total for 40 Container ($)</label>
                  </a>
                  <input
                    type="number"
                    id="total40ftContainer"
                    name="total40ftContainer"
                    placeholder="Total for 40' Container"
                    value={70000}
                    disabled={true}
                    required
                  />
                </div>

                {/* Domestic Transport */}
                <p>Domestic Transport</p>

                {/* Cost of 5T truck to site */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of using a 5T truck for transport.">
                    <label htmlFor="costOf5TTruck">Cost of 5T Truck to Site ($)</label>
                  </a>
                  <input
                    type="number"
                    id="costOf5TTruck"
                    name="costOf5TTruck"
                    placeholder="Enter Cost of 5T Truck"
                    value={100000}
                    required
                  />
                </div>

                {/* Split racking transport with how many other categories */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of other categories to split racking transport with.">
                    <label htmlFor="splitRackingTransport">Split Racking Transport With How Many Categories?</label>
                  </a>
                  <input
                    type="number"
                    id="splitRackingTransport"
                    name="splitRackingTransport"
                    placeholder="Enter Number of Categories"
                    value={2}
                    required
                  />
                </div>

                {/* Split panels transport with how many other categories */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of other categories to split panel transport with.">
                    <label htmlFor="splitPanelsTransport">Split Panels Transport With How Many Categories?</label>
                  </a>
                  <input
                    type="number"
                    id="splitPanelsTransport"
                    name="splitPanelsTransport"
                    placeholder="Enter Number of Categories"
                    value={1}
                    required
                  />
                </div>

                {/* Split power house cabinet transport with how many other categories */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of other categories to split power house cabinet transport with.">
                    <label htmlFor="splitPowerHouseTransport">Split Power House Cabinet Transport With How Many Categories?</label>
                  </a>
                  <input
                    type="number"
                    id="splitPowerHouseTransport"
                    name="splitPowerHouseTransport"
                    placeholder="Enter Number of Categories"
                    value={1}
                    required
                  />
                </div>

                {/* Split meters transport with how many other categories */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Number of other categories to split meter transport with.">
                    <label htmlFor="splitMetersTransport">Split Meters Transport With How Many Categories?</label>
                  </a>
                  <input
                    type="number"
                    id="splitMetersTransport"
                    name="splitMetersTransport"
                    placeholder="Enter Number of Categories"
                    value={2}
                    required
                  />
                </div>

                {/* Normal cargo boat transport cost */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of using a normal cargo boat for transport.">
                    <label htmlFor="normalCargoBoatCost">Normal Cargo Boat Transport Cost ($)</label>
                  </a>
                  <input
                    type="number"
                    id="normalCargoBoatCost"
                    name="normalCargoBoatCost"
                    placeholder="Enter Normal Cargo Boat Cost"
                    value={20000}
                    required
                  />
                </div>

                {/* Big boat transport cost */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Cost of using a big boat for transport.">
                    <label htmlFor="bigBoatTransportCost">Big Boat Transport Cost ($)</label>
                  </a>
                  <input
                    type="number"
                    id="bigBoatTransportCost"
                    name="bigBoatTransportCost"
                    placeholder="Enter Big Boat Transport Cost"
                    value={48000}
                    required
                  />
                </div>

                {/* Taxes */}
                <p>Taxes</p>

                {/* VAT */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Value Added Tax percentage.">
                    <label htmlFor="vat">VAT (%)</label>
                  </a>
                  <input
                    type="number"
                    id="vat"
                    name="vat"
                    placeholder="Enter VAT Percentage"
                    value={16}
                    required
                  />
                </div>

                {/* Taxes besides VAT */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Other applicable taxes besides VAT.">
                    <label htmlFor="otherTaxes">Taxes Besides VAT (%)</label>
                  </a>
                  <input
                    type="number"
                    id="otherTaxes"
                    name="otherTaxes"
                    placeholder="Enter Other Taxes Percentage"
                    value={5.5}
                    required
                  />
                </div>

                {/* Import Duty */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="Import Duty percentage applied to racking.">
                    <label htmlFor="importDuty">Import Duty (%)</label>
                  </a>
                  <input
                    type="number"
                    id="importDuty"
                    name="importDuty"
                    placeholder="Enter Import Duty Percentage"
                    value={25}
                    required
                  />
                </div>

                {/* NCA Levy */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="NCA Levy applicable on amounts over Kshs 5M.">
                    <label htmlFor="ncaLevy">NCA Levy (%)</label>
                  </a>
                  <input
                    type="number"
                    id="ncaLevy"
                    name="ncaLevy"
                    placeholder="Enter NCA Levy Percentage"
                    value={0.5}
                    required
                  />
                </div>

                {/* NEMA application fee */}
                <div className="form-group">
                  <a data-tooltip-id="form-tooltip" data-tooltip-content="NEMA application fee.">
                    <label htmlFor="nemaApplicationFee">NEMA Application Fee ($)</label>
                  </a>
                  <input
                    type="number"
                    id="nemaApplicationFee"
                    name="nemaApplicationFee"
                    placeholder="NEMA Application Fee"
                    value={31058}
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
