import { Text, View } from '@react-pdf/renderer';
import { format } from 'date-fns';

import { styles } from '../styles';

const PaySlipTitleSection = ({
  startPeriod,
  endPeriod,
}: {
  startPeriod: string;
  endPeriod: string;
}) => (
  <View style={styles.topSectionContainer}>
    <Text style={[styles.paySlipsTitle, styles.boldText]}>BULLETIN DE PAIE</Text>
    <Text style={[styles.payPeriodTitle, styles.boldText]}>
      PAYE DU {format(new Date(startPeriod), 'dd/MM/yyyy')} AU{' '}
      {format(new Date(endPeriod), 'dd/MM/yyyy')}
    </Text>
  </View>
);

export default PaySlipTitleSection;
