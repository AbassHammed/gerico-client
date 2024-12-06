import { Text, View } from '@react-pdf/renderer';

import { PaySlipItem, PaySlipRow } from '../interface';
import { styles } from '../styles';
import { totals } from '../utils/calculateSalaryAndTotalDeductions';

const paySlipTotalDeductions: PaySlipItem[] = [
  //TOTAL DES COTISATIONS
  {
    isCotisationTitle: true,
    cotisation: 'TOTAL DES COTISATIONS',
    assiette: '',
    partSalariale: {
      percentage: 0,
      amount: totals.totalSalarial,
    },
    partPatronale: {
      percentage: 0,
      amount: totals.totalPatronal,
    },
  },
];

const PaySlipRowTotalDeduction: React.FC<PaySlipRow> = ({
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

export { PaySlipRowTotalDeduction, paySlipTotalDeductions };
