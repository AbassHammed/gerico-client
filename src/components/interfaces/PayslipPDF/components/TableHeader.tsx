import { Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

const PaySlipHeader = () => (
  <View style={styles.paySlipRow1}>
    {/* Colonne des cotisations */}
    <View style={[styles.paySlipCell, styles.paySlipColCotisation, styles.paySlipHeader]}>
      <Text style={styles.boldText}>COTISATIONS</Text>
    </View>

    {/* Colonne de l'assiette */}
    <View style={[styles.paySlipCell, styles.paySlipColAssiette, styles.paySlipHeader]}>
      <Text style={styles.boldText}>ASSIETTE</Text>
    </View>

    {/* Colonne de la part salariale */}
    <View style={styles.paySlipColPart}>
      <View style={[styles.paySlipCell, styles.paySlipHeader]}>
        <Text style={styles.boldText}>PART SALARIALE</Text>
      </View>
      <View style={styles.paySlipColInner}>
        <View style={[styles.paySlipCell, styles.paySlipColSmall, styles.paySlipHeader1]}>
          <Text style={styles.boldText}>Taux</Text>
        </View>
        <View style={[styles.paySlipCell, styles.paySlipColSmall, styles.paySlipHeader1]}>
          <Text style={styles.boldText}>Montant (€)</Text>
        </View>
      </View>
    </View>

    {/* Colonne de la part patronale */}
    <View style={styles.paySlipColPart}>
      <View style={[styles.paySlipCell, styles.paySlipHeader]}>
        <Text style={styles.boldText}>PART PATRONALE</Text>
      </View>
      <View style={styles.paySlipColInner}>
        <View style={[styles.paySlipCell, styles.paySlipColSmall, styles.paySlipHeader1]}>
          <Text style={styles.boldText}>Taux</Text>
        </View>
        <View style={[styles.paySlipCell, styles.paySlipColSmall, styles.paySlipHeader1]}>
          <Text style={styles.boldText}>Montant (€)</Text>
        </View>
      </View>
    </View>
  </View>
);

export default PaySlipHeader;
