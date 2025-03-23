import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'User-Friendly Interface',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        OpenTutorAI is designed with simplicity in mind, 
        making it easy to set up and get started. 
        Our intuitive interface ensures a smooth experience from the moment you start using it.
      </>
    ),
  },
  {
    title: 'Seamless Integration',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Focus on building amazing learning experiences, and let OpenTutorAI handle the heavy lifting. 
        Easily integrate with existing platforms, tools, and APIs to enhance the learning process.
      </>
    ),
  },
  {
    title: 'Customizable & Scalable',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        OpenTutorAI is built with flexibility in mind. 
        Customize its features, and extend its capabilities to meet the specific needs of your users, 
        whether you're supporting a small class or scaling to large institutions.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
