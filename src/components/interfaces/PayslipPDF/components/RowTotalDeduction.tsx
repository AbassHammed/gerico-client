import { IPaySlipRow } from '@/types';
import { Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

const PaySlipRowTotalDeduction: React.FC<IPaySlipRow> = ({
  isCotisationTitle,
  cotisation,
  partSalariale,
  partPatronale,
}) => (
  <View style={styles.paySlipRow}>
    <View style={[styles.paySlipCellCotisation, styles.paySlipColCotisation]}>
      <Text
        style={[styles.paySlipCellText, isCotisationTitle ? styles.boldText : styles.normalText]}>
        {cotisation}
      </Text>
    </View>
    <View style={[styles.paySlipCell, styles.paySlipColAssiette]}></View>
    <View style={styles.paySlipColPart}>
      <View style={styles.paySlipColInner}>
        <View style={[styles.paySlipCell, styles.paySlipColSmall]}></View>
        <View style={[styles.paySlipCell, styles.paySlipColSmall, styles.boldText]}>
          <Text>{partSalariale.amount ? partSalariale.amount : ''}</Text>
        </View>
      </View>
    </View>
    <View style={styles.paySlipColPart}>
      <View style={styles.paySlipColInner}>
        <View style={[styles.paySlipCell, styles.paySlipColSmall]}></View>
        <View style={[styles.paySlipCell, styles.paySlipColSmall, styles.boldText]}>
          <Text>{partPatronale.amount ? partPatronale.amount : ''}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default PaySlipRowTotalDeduction;
