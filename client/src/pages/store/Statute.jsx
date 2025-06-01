import { useTranslation } from 'react-i18next';

export default function Statute() {
  const { t } = useTranslation();

  return (
<div className="flex flex-col flex-grow justify-center items-center pt-10 mt-26 mb-16 text-white">
      <h1 className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center w-100">
        {t('statute.title')} 
      </h1>

      <div className="flex flex-grow gap-4 justify-center items-center w-3/5">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mt-8 text-lg">
            <p className="mb-8 text-sm">{t('statute.actualizationDate')} 21.05.2025</p>
            <ol className="list-decimal">

              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('statute.subtitle1')}</h2>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('statute.content1.item1')}</li>
                  <li>{t('statute.content1.item2')}</li>
                  <li>{t('statute.content1.item3')}</li>
                </ul>
              </li>

              <li className="font-bold">
                <h2 className="mt-8 text-xl font-bold">{t('statute.subtitle2')}</h2>
                 <ul className="list-disc ml-5 font-normal">
                  <li><span className="font-semibold">{t('statute.content2.item1.1')}</span> - {t('statute.content2.item1.2')}</li>
                  <li><span className="font-semibold">{t('statute.content2.item2.1')}</span> - {t('statute.content2.item2.2')}</li>
                  <li><span className="font-semibold">{t('statute.content2.item3.1')}</span> - {t('statute.content2.item3.2')}</li>
                 </ul>
              </li>

              <li className="font-bold">
                <h2 className="mt-8 text-xl font-bold">{t('statute.subtitle3')}</h2>
                 <ul className="list-disc ml-5 font-normal">
                  <li>{t('statute.content3.item1')}</li>
                  <li>{t('statute.content3.item2')}</li>
                 </ul>
              </li>

              <li className="font-bold">
                <h2 className="mt-8 text-xl font-bold">{t('statute.subtitle4')}</h2>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('statute.content4.item1')}</li>
                  <li>{t('statute.content4.item2')}</li>
                  <li>{t('statute.content4.item3')}</li>
                  <li>{t('statute.content4.item4')}</li>
                </ul>
              </li>

              <li className="font-bold">
                <h2 className="mt-8 text-xl font-bold">{t('statute.subtitle5')}</h2>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('statute.content5.item1')}</li>
                  <li>{t('statute.content5.item2')}</li>
                  <li>{t('statute.content5.item3')}</li>
                </ul>
              </li>

              <li className="font-bold">
                <h2 className="mt-8 text-xl font-bold">{t('statute.subtitle6')}</h2>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('statute.content6.item1')}</li>
                  <li>{t('statute.content6.item2')}</li>
                  <li>{t('statute.content6.item3')}</li>
                  <li>{t('statute.content6.item4')}</li>
                </ul>
              </li>

              <li className="font-bold">
                <h2 className="mt-8 text-xl font-bold">{t('statute.subtitle7')}</h2>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('statute.content7.item1')}</li>
                  <li>{t('statute.content7.item2')}</li>
                  <li>{t('statute.content7.item3')}</li>
                  <li>{t('statute.content7.item4')}</li>
                  <li>{t('statute.content7.item5')}</li>
                </ul>
              </li>

              <li className="font-bold">
                <h2 className="mt-8 text-xl font-bold">{t('statute.subtitle8')}</h2>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('statute.content8.item1')}</li>
                  <li>{t('statute.content8.item2')}</li>
                  <li>{t('statute.content8.item3')}</li>
                  <li>{t('statute.content8.item4')}</li>
                </ul>
              </li>

              <li className="font-bold">
                <h2 className="mt-8 text-xl font-bold">{t('statute.subtitle9')}</h2>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('statute.content9.item1')}</li>
                  <li>{t('statute.content9.item2')}</li>
                </ul>
              </li>

              <li className="font-bold">
                <h2 className="mt-8 text-xl font-bold">{t('statute.subtitle10')}</h2>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('statute.content10.item1')}</li>
                  <li>{t('statute.content10.item2')}</li>
                  <li>{t('statute.content10.item3')}</li>
                  <li>{t('statute.content10.item4')}</li>
                </ul>
              </li>
              
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}