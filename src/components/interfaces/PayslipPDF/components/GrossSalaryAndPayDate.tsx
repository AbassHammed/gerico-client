/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

const GrossSalarySection = ({ grossSalary, payDate }: { grossSalary: number; payDate: string }) => (
  <View style={styles.middleSectionContainer}>
    {/* Conteneur pour le salaire brut */}
    <View style={styles.leaveRequestContainer}>
      <View style={styles.leaveRequestRow}>
        <Text style={[styles.leaveRequestCell, styles.leaveRequestHeaderCell, styles.boldText]}>
          SALAIRE BRUT
        </Text>
        <Text style={[styles.leaveRequestCell, styles.leaveRequestHeaderCell2]}>
          {grossSalary} €
        </Text>
      </View>
    </View>
    {/* Date de paiement */}
    <Text style={styles.middleTextContainer}>
      Payé le{' '}
      {new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(payDate))}
    </Text>
  </View>
);

export default GrossSalarySection;
