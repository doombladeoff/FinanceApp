import { Text, View } from "react-native";
import { StatisticCard } from "../../components/StatisticCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUserData } from "../../../services/getUserData";
import { FIREBASE_AUTH } from "../../../config/FirebaseConfig";
import { BarChart } from "react-native-gifted-charts";

const aggregateTransactionsByMonth = (transactions) => {
    const result = Array(12).fill().map(() => ({
        expense: 0,
        income: 0
    }));
    transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const month = date.getMonth(); // 0-11
        const amount = parseFloat(transaction.amount);
        if (transaction.type === 'Expense') {
            result[month].expense += amount;
        } else if (transaction.type === 'Income') {
            result[month].income += amount;
        }
    });
    return result;
};
const prepareChartData = (aggregatedData) => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    aggregatedData.forEach((monthData, index) => {
        data.push({
            value: monthData.income,
            label: labels[index],
            frontColor: '#006DFF',
            gradientColor: '#009FFF'
        });
        data.push({
            value: monthData.expense,
            frontColor: '#3BE9DE',
            gradientColor: '#93FCF8',
            spacing: 5
        });
    });
    return data;
};

const calculateChartConfig = (aggregatedData) => {
    const maxIncome = Math.max(...aggregatedData.map(data => data.income));
    const maxExpense = Math.max(...aggregatedData.map(data => data.expense));
    const maxValue = Math.max(maxIncome, maxExpense) * 2;
    const roundedMaxValue = Math.ceil(maxValue / 1000) * 1000;

    const stepValue = Math.ceil(roundedMaxValue / 5);
    const noOfSections = Math.ceil(roundedMaxValue / stepValue);
    const yAxisLabelTexts = Array.from({ length: noOfSections + 1 }, (_, i) => i === 0 ? '0' : `${i}k`);

    return { stepValue, yAxisLabelTexts, roundedMaxValue, maxExpense, maxIncome };
};
export const StatisticScreen = () => {
    const user = FIREBASE_AUTH?.currentUser;
    const [valueData, setValueData] = useState([]);
    const [viewSize, setViewSize] = useState({
        height: 0,
        width: 0
    });
    const scrollRef = useRef(null)
    const handleLayout = (event) => {
        const { height, width } = event.nativeEvent.layout;
        setViewSize({ height, width });
    };

    const getTransactionsValue = useCallback(async () => {
        try {
            const { transactions } = await getUserData(user);
            setValueData(transactions);
        } catch (error) {
            console.error('Error getting transactions:', error);
        }
    });

    useEffect(() => {
        getTransactionsValue();
        if (scrollRef.current) {
            const currentMonth = new Date().getMonth(); // 0-11
            const offset = currentMonth * (16 + 10 + 14); // barWidth + initialSpacing + spacing
            scrollRef.current.scrollTo({ x: offset, animated: true });
        }
    }, []);
    const aggregatedData = aggregateTransactionsByMonth(valueData);
    const dataV = prepareChartData(aggregatedData);
    const {
        noOfSections,
        yAxisLabelTexts,
        roundedMaxValue,
    } = calculateChartConfig(aggregatedData);

    const income = aggregatedData.reduce((acc, data) => acc + data.income, 0);
    const expense = aggregatedData.reduce((acc, data) => acc + data.expense, 0);

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
                <Text style={{ fontSize: 18 }}>Overview</Text>
                <Text style={{ fontSize: 18 }}>Yearly</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                <StatisticCard title='Income' value={income}/>
                <StatisticCard title='Expense' value={expense}/>
            </View>

            <View style={{ marginTop: 30, flex: 1 }} onLayout={handleLayout}>
                <BarChart
                    scrollRef={scrollRef}
                    scrollToIndex={8}
                    isAnimated={true}
                    width={viewSize.width}
                    height={viewSize.height / 1.2}
                    data={dataV}
                    spacing={5}
                    barBorderTopLeftRadius={5}
                    barBorderTopRightRadius={5}
                    showGradient
                    yAxisThickness={0}
                    xAxisThickness={0}
                    rulesType={'solid'}
                    xAxisColor={'lightgray'}
                    yAxisTextStyle={{ color: 'black' }}
                    stepValue={1000}
                    maxValue={roundedMaxValue}
                    noOfSections={noOfSections}
                    yAxisLabelTexts={yAxisLabelTexts}
                    xAxisLabelTextStyle={{ color: 'black', textAlign: 'center' }}
                    barWidth={25}
                    rotateLabel={true}
                    focusBarOnPress={true}
                    showLine
                    lineConfig={{
                        color: '#F29C6E',
                        thickness: 2,
                        curved: true,
                        hideDataPoints: true,
                        shiftY: 10,
                    }}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 20, gap: 10 }}>
                <View style={{ height: 20, width: 20, backgroundColor: '#006DFF', borderRadius: 5 }}/>
                <Text>Income</Text>
                <View style={{ height: 20, width: 20, backgroundColor: '#3BE9DE', borderRadius: 5 }}/>
                <Text>Expense</Text>
            </View>
        </View>
    );
}