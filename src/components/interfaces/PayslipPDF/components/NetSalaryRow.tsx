import { Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

const NetSalaryRow = ({
  grossSalary,
  totalSalarial,
}: {
  grossSalary: number;
  totalSalarial: number;
}) => {
  const netSalaryBeforeTax = (grossSalary - totalSalarial).toFixed(2);

  return (
    <View style={styles.middleSectionContainer}>
      <View style={styles.leaveRequestContainer1}>
        <View style={styles.leaveRequestRow}>
          <Text style={[styles.leaveRequestCell, styles.leaveRequestHeaderCell3, styles.boldText]}>
            SALAIRE NET AVANT IMPÔT SUR LE REVENU
          </Text>
          <Text style={[styles.leaveRequestCell, styles.leaveRequestHeaderCell4]}>
            {netSalaryBeforeTax} €
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NetSalaryRow;
