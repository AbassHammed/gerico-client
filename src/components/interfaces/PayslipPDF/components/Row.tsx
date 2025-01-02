import { IPaySlipRow } from '@/types';
import { Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

const PaySlipRow: React.FC<IPaySlipRow> = ({
  isCotisationTitle,
  cotisation,
  assiette,
  partSalariale,
  partPatronale,
}) => {
  // Fonction utilitaire pour formater les pourcentages
  const formatPercentage = (decimal?: number | string): string => {
    if (typeof decimal === 'string') {
      const decimalNumber = parseFloat(decimal);
      return decimalNumber && decimalNumber > 0 ? `${(decimalNumber * 100).toFixed(2)}%` : '';
    }
    return decimal && decimal > 0 ? `${(decimal * 100).toFixed(2)}%` : '';
  };

  return (
    <View style={styles.paySlipRow}>
      {/* Cotisation */}
      <View style={[styles.paySlipCell, styles.paySlipColCotisation]}>
        <Text
          style={[styles.paySlipCellText, isCotisationTitle ? styles.boldText : styles.normalText]}>
          {cotisation}
        </Text>
      </View>

      {/* Assiette */}
      <View style={[styles.paySlipCell, styles.paySlipColAssiette]}>
        <Text>{assiette || ''}</Text>
      </View>

      {/* Part Salariale */}
      <View style={styles.paySlipColPart}>
        <View style={styles.paySlipColInner}>
          <View style={[styles.paySlipCell, styles.paySlipColSmall]}>
            <Text>{formatPercentage(partSalariale?.percentage)}</Text>
          </View>
          <View style={[styles.paySlipCell, styles.paySlipColSmall]}>
            <Text>{partSalariale?.amount || ''}</Text>
          </View>
        </View>
      </View>

      {/* Part Patronale */}
      <View style={styles.paySlipColPart}>
        <View style={styles.paySlipColInner}>
          <View style={[styles.paySlipCell, styles.paySlipColSmall]}>
            <Text>{formatPercentage(partPatronale?.percentage)}</Text>
          </View>
          <View style={[styles.paySlipCell, styles.paySlipColSmall]}>
            <Text>{partPatronale?.amount || ''}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaySlipRow;
