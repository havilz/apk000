import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const StatisticsScreen = () => {
  // Data dummy untuk produk
  const products = [
    { id: '1', name: 'Produk A', image: 'https://via.placeholder.com/100', sales: [5, 8, 3, 10, 6, 7, 4] },
    { id: '2', name: 'Produk B', image: 'https://via.placeholder.com/100', sales: [3, 6, 9, 7, 5, 8, 6] },
    // Tambahkan produk sesuai kebutuhan
  ];

  // Data dummy untuk statistik keseluruhan
  const totalSales = [10, 15, 7, 20, 12, 14, 9]; // Penjualan mingguan total

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laporan Statistik</Text>

      {/* Statistik Keseluruhan */}
      <View style={styles.overallStats}>
        <Text style={styles.subtitle}>Statistik Keseluruhan</Text>
        <LineChart
          data={{
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [{ data: totalSales }]
          }}
          width={300} // Sesuaikan lebar grafik
          height={150}
          yAxisLabel=""
          yAxisSuffix=""
          withHorizontalLines={false}
          withVerticalLines={false}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          style={styles.chart}
        />
      </View>

      {/* Statistik per Produk */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.chartContainer}>
              <LineChart
                data={{
                  labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
                  datasets: [{ data: item.sales }]
                }}
                width={300} // Sesuaikan lebar grafik
                height={150}
                yAxisLabel=""
                yAxisSuffix=""
                withHorizontalLines={false}
                withVerticalLines={false}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                style={styles.chart}
              />
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  overallStats: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
  },
});

export default StatisticsScreen;