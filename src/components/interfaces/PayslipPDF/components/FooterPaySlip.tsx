/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Link, Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

const FooterPaySlip = () => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerText}>
      Dans votre intérêt, et pour faire valoir vos droits, conservez ce bulletin de paie sans
      limitation de durée. Pour toutes informations complémentaires :
    </Text>
    <Link style={styles.footerLink} src="https://www.service-public.fr">
      www.service-public.fr
    </Link>
  </View>
);

export default FooterPaySlip;
