/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Layout from '@/components/layouts/Default';

import ContactContainer from './Contact';
import content from './data';

const Contact = () => (
  <>
    <Layout className="overflow-visible">
      <ContactContainer
        {...content.heroSection}
        className="[&_h1]:2xl:!text-5xl bg-default border-0 lg:pb-8 [&_.ph-footer]:mt-0 [&_.ph-footer]:lg:mt-16 [&_.ph-footer]:xl:mt-32"
        sectionContainerClassName="lg:gap-4"
      />
    </Layout>
  </>
);

export default Contact;
