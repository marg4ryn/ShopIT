import { useTranslation } from 'react-i18next';

export default function Statute() {
  const { t } = useTranslation();

  return (
<div className="flex flex-col flex-grow justify-center items-center pt-10 mt-26 mb-16 text-white">
      <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center w-100">
        {t('others.ShopIt')} {t('statute.title')} 
      </div>

      <div className="flex flex-grow gap-4 justify-center items-center w-3/5">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mt-8">
            <p className="mb-8">{t('statute.actualizationDate')} 21.05.2025</p>
            <p className="mt-8 text-xl font-bold">1. {t('statute.subtitle1')}</p>
            <p className="text-lg"> - {t('statute.content1.item1')}</p>
            <p className="text-lg"> - {t('statute.content1.item2')}</p>
            <p className="text-lg"> - {t('statute.content1.item3')}</p>

            <p className="mt-8 text-xl font-bold">2. {t('statute.subtitle2')}</p>
            <p className="text-lg">
              - <span className="font-semibold">{t('statute.content2.item1.1')}</span> - {t('statute.content2.item1.2')}
            </p>
            <p className="text-lg">
              - <span className="font-semibold">{t('statute.content2.item2.1')}</span> - {t('statute.content2.item2.2')}
            </p>
            <p className="text-lg">
              - <span className="font-semibold">{t('statute.content2.item3.1')}</span> - {t('statute.content2.item3.2')}
            </p>

            <p className="mt-8 text-xl font-bold">3. {t('statute.subtitle3')}</p>
            <p className="text-lg"> - {t('statute.content3.item1')}</p>
            <p className="text-lg"> - {t('statute.content3.item2')}</p>

            <p className="mt-8 text-xl font-bold">4. {t('statute.subtitle4')}</p>
            <p className="text-lg"> - {t('statute.content4.item1')}</p>
            <p className="text-lg"> - {t('statute.content4.item2')}</p>
            <p className="text-lg"> - {t('statute.content4.item3')}</p>
            <p className="text-lg"> - {t('statute.content4.item4')}</p>

            <p className="mt-8 text-xl font-bold">5. {t('statute.subtitle5')}</p>
            <p className="text-lg"> - {t('statute.content5.item1')}</p>
            <p className="text-lg"> - {t('statute.content5.item2')}</p>
            <p className="text-lg"> - {t('statute.content5.item3')}</p>

            <p className="mt-8 text-xl font-bold">6. {t('statute.subtitle6')}</p>
            <p className="text-lg"> - {t('statute.content6.item1')}</p>
            <p className="text-lg"> - {t('statute.content6.item2')}</p>
            <p className="text-lg"> - {t('statute.content6.item3')}</p>
            <p className="text-lg"> - {t('statute.content6.item4')}</p>

            <p className="mt-8 text-xl font-bold">7. {t('statute.subtitle7')}</p>
            <p className="text-lg"> - {t('statute.content7.item1')}</p>
            <p className="text-lg"> - {t('statute.content7.item2')}</p>
            <p className="text-lg"> - {t('statute.content7.item3')}</p>
            <p className="text-lg"> - {t('statute.content7.item4')}</p>
            <p className="text-lg"> - {t('statute.content7.item5')}</p>

            <p className="mt-8 text-xl font-bold">8. {t('statute.subtitle8')}</p>
            <p className="text-lg"> - {t('statute.content8.item1')}</p>
            <p className="text-lg"> - {t('statute.content8.item2')}</p>
            <p className="text-lg"> - {t('statute.content8.item3')}</p>
            <p className="text-lg"> - {t('statute.content8.item4')}</p>

            <p className="mt-8 text-xl font-bold">9. {t('statute.subtitle9')}</p>
            <p className="text-lg"> - {t('statute.content9.item1')}</p>
            <p className="text-lg"> - {t('statute.content9.item2')}</p>

            <p className="mt-8 text-xl font-bold">10. {t('statute.subtitle10')}</p>
            <p className="text-lg"> - {t('statute.content10.item1')}</p>
            <p className="text-lg"> - {t('statute.content10.item2')}</p>
            <p className="text-lg"> - {t('statute.content10.item3')}</p>
            <p className="text-lg"> - {t('statute.content10.item4')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}