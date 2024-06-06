import React from "react";
import { FormProvider } from "./components/3as/FormContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ButtonsPage from "./Principal";
import FormComponent from "./components/3as/FormContent";
import Campanhas from "./components/campanhas/CampanhasComponent";
import Majoracao from "./components/majoracao/MajoracaoComponent";
import Navbar from "./components/Navbar";
import SearchResults from "./components/search/SearchResults";
import NotFound from "./components/search/NotFound";
import AcordoComoServicoItem from "./components/3as/AcordoComoServicoItem";
import MajoracaoItem from "./components/majoracao/MajoracaoItem";
import CampanhasItem from "./components/campanhas/CampanhasItem";
import MajoracaoHistorico from "./components/majoracao/MajoracaoHistorico";
import AcordoComoServicoHistorico from "./components/3as/AcordoComoServicoHistorico";
import CampanhasHistorico from "./components/campanhas/CampanhasHistorico";
import PriceDetailsItem from "./components/pricing/PriceDetailsItem";

const App = () => {
  return (
    <FormProvider>
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<ButtonsPage />} />
            <Route path="/3as" element={<FormComponent />} />
            <Route path="/campanhas" element={<Campanhas />} />
            <Route path="/majoracao" element={<Majoracao />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route
              path="/3as-item/:cd_pasta"
              element={<AcordoComoServicoItem />}
            />
            <Route
              path="/majoracao-item/:cd_pasta"
              element={<MajoracaoItem />}
            />
            <Route
              path="/load/majoracao-historico"
              element={<MajoracaoHistorico />}
            />
            <Route
              path="/load/3as-historico"
              element={<AcordoComoServicoHistorico />}
            />
            <Route
              path="/load/campanhas-historico"
              element={<CampanhasHistorico />}
            />
            <Route
              path="/campanhas-item/:cd_pasta"
              element={<CampanhasItem />}
            />
            <Route
              path="/details/price-item-details/:id_field"
              element={<PriceDetailsItem />}
            />
          </Routes>
        </div>
      </Router>
    </FormProvider>
  );
};

// const App = () => {
//   return (
//     <FormProvider>
//       <div className="App">
//         <h1>Form with Context</h1>
//         <FormComponent />
//       </div>
//     </FormProvider>
//   );
// };

export default App;
