import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col flex-grow justify-center items-center pt-10 mt-26 mb-16 text-white">
      <div className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center w-100">
        {t('privacyPolicy.title')} {t('others.ShopIt')}
      </div>

      <div className="flex flex-grow gap-4 justify-center items-center w-3/5">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mt-8">
            <p className="mb-8">{t('privacyPolicy.actualizationDate')} 21.05.2025</p>
            <p className="mt-8 text-xl font-bold">1. {t('privacyPolicy.subtitle1')}</p>
            <p className="text-lg">{t('privacyPolicy.content1')}</p>

            <p className="mt-8 text-xl font-bold">2. {t('privacyPolicy.subtitle2')}</p>
            <p className="text-lg">{t('privacyPolicy.content2')}</p>

            <p className="mt-8 text-xl font-bold">3. {t('privacyPolicy.subtitle3')}</p>
            <p className="text-lg">{t('privacyPolicy.content3')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content3.item1')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content3.item2')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content3.item3')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content3.item4')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content3.item5')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content3.item6')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content3.item7')}</p>

            <p className="mt-8 text-xl font-bold">4. {t('privacyPolicy.subtitle4')}</p>
            <p className="text-lg">{t('privacyPolicy.content4')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content4.item1')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content4.item2')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content4.item3')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content4.item4')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content4.item5')}</p>

            <p className="mt-8 text-xl font-bold">5. {t('privacyPolicy.subtitle5')}</p>
            <p className="text-lg">{t('privacyPolicy.content5')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content5.item1')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content5.item2')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content5.item3')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content5.item4')}</p>

            <p className="mt-8 text-xl font-bold">6. {t('privacyPolicy.subtitle6')}</p>
            <p className="text-lg">{t('privacyPolicy.content6')}</p>

            <p className="mt-8 text-xl font-bold">7. {t('privacyPolicy.subtitle7')}</p>
            <p className="text-lg">{t('privacyPolicy.content7')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content7.item1')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content7.item2')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content7.item3')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content7.item4')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content7.item5')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content7.item6')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content7.item7')}</p>
            <p className="text-lg"> - {t('privacyPolicy.content7.item8')}</p>

            <p className="mt-8 text-xl font-bold">8. {t('privacyPolicy.subtitle8')}</p>
            <p className="text-lg">{t('privacyPolicy.content8')}</p>

            <p className="mt-8 text-xl font-bold">9. {t('privacyPolicy.subtitle9')}</p>
            <p className="text-lg">{t('privacyPolicy.content9')}</p>

            <p className="mt-8 text-xl font-bold">10. {t('privacyPolicy.subtitle10')}</p>
            <p className="text-lg">{t('privacyPolicy.content10')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}