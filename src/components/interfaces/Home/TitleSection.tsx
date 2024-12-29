'use client';

const TitleSection = ({ title }: { title: string }) => (
  <div className="py-10">
    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-600 dark:text-white">
      {title}
    </h1>
  </div>
);

export default TitleSection;
