import { Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

const RemainingLeave = ({ remainingLeave }: { remainingLeave: string }) => (
  <View style={styles.leaveRequestContainer1}>
    <View style={styles.leaveRequestRow}>
      <Text style={[styles.leaveRequestCell, styles.leaveRequestHeaderCell, styles.boldText]}>
        Jours de congés restant(s)
      </Text>
      <Text style={[styles.leaveRequestCell, styles.leaveRequestHeaderCell2]}>
        {remainingLeave} jours
      </Text>
    </View>
  </View>
);

export default RemainingLeave;
