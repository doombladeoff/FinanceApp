import { Dimensions, Text, View } from "react-native";
import { StatisticCard } from "../../components/StatisticCard";
import { transactions } from "../../../transactionData";
import { BarChart } from "react-native-gifted-charts";


const processTransactions = (transactions) => {
    const monthlyData = Array.from({ length: 12 }, () => ({ income: 0, expense: 0 }));

    transactions.forEach(transaction => {
        const month = new Date(transaction.date).getMonth();
        if (transaction.type === 'Income') {
            monthlyData[month].income += transaction.amount;
        } else if (transaction.type === 'Expense') {
            monthlyData[month].expense += transaction.amount;
        }
    });

    const labels = [];
    const incomeData = [];
    const expenseData = [];

    for (let month = 0; month < 12; month++) {
        labels.push(new Date(2021, month).toLocaleString('default', { month: 'short' }));
        incomeData.push({ value: monthlyData[month].income });
        expenseData.push({ value: monthlyData[month].expense });
    }

    return { labels, incomeData, expenseData };
};

export const StatisticScreen = () => {

    const income = transactions.filter(transaction => transaction.type === "Income").reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = transactions.filter(transaction => transaction.type === "Expense").reduce((acc, transaction) => acc + transaction.amount, 0);
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const chartData = processTransactions(transactions);

    const data = [
        { value: 2500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Jan' },
        { value: 2400, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 3500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Feb' },
        { value: 3000, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 4500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Mar' },
        { value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 5200, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'Apr' },
        { value: 4900, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

        { value: 3000, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label: 'May' },
        { value: 2800, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 18 }}>Overview</Text>
                    <Text style={{ fontSize: 18 }}>Yearly</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                    <StatisticCard title='Income' value={income}/>
                    <StatisticCard title='Expense' value={expense}/>
                </View>
                <View style={{ marginTop: 30 }}>
                    <BarChart
                        isAnimated={true}
                        width={screenWidth}
                        data={data}
                        barWidth={16}
                        initialSpacing={10}
                        spacing={14}
                        barBorderRadius={4}
                        showGradient
                        yAxisThickness={0}
                        xAxisType={'dashed'}
                        xAxisColor={'lightgray'}
                        yAxisTextStyle={{ color: 'black' }}
                        stepValue={1000}
                        maxValue={6000}
                        noOfSections={6}
                        yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}
                        labelWidth={40}
                        xAxisLabelTextStyle={{ color: 'black', textAlign: 'center' }}
                        showLine
                        lineConfig={{
                            color: '#F29C6E',
                            thickness: 3,
                            curved: true,
                            hideDataPoints: true,
                            shiftY: 20,
                            initialSpacing: -30,
                        }}
                    />
                </View>
            </View>
        </View>
    );
}