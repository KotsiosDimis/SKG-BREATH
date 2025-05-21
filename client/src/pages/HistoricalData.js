import Layout from '../components/Layout';
import PollutionChartAmpelokipon from '../components/PollutionChartAmpelokipon';
// import PollutionChartDimos_delta from '../components/PollutionChartDimos_delta';

const HistoricalData = () => {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Statistics</h1>
        <div><PollutionChartAmpelokipon/></div>
        {/* <br/>
        <div><PollutionChartDimos_delta/></div> */}

      </div>
    </Layout>
  );
};

export default HistoricalData;
