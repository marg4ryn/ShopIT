import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col flex-grow justify-center items-center pt-10 mt-26 mb-16 text-white">
      <h1 className="inline-block bg-green-700 text-white text-2xl font-bold px-6 py-3 rounded-md shadow-md text-center w-100">
        {t('privacyPolicy.title')} {t('others.ShopIt')}
      </h1>

      <div className="flex flex-grow gap-4 justify-center items-center w-3/5">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mt-8 text-lg">
            <p className="mb-8 text-sm">{t('privacyPolicy.actualizationDate')} 21.05.2025</p>
            <ol className="list-decimal">            
            
              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('privacyPolicy.subtitle1')}</h2>
                <p className="font-normal">{t('privacyPolicy.content1')}</p>
              </li>

              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('privacyPolicy.subtitle2')}</h2>
                <p className="font-normal">{t('privacyPolicy.content2')}</p>
              </li>

              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('privacyPolicy.subtitle3')}</h2>
                <p className="font-normal">{t('privacyPolicy.content3')}</p>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('privacyPolicy.content3.item1')}</li>
                  <li>{t('privacyPolicy.content3.item2')}</li>
                  <li>{t('privacyPolicy.content3.item3')}</li>
                  <li>{t('privacyPolicy.content3.item4')}</li>
                  <li>{t('privacyPolicy.content3.item5')}</li>
                  <li>{t('privacyPolicy.content3.item6')}</li>
                  <li>{t('privacyPolicy.content3.item7')}</li>
                </ul>
              </li>

              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('privacyPolicy.subtitle4')}</h2>
                <p className="font-normal">{t('privacyPolicy.content4')}</p>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('privacyPolicy.content4.item1')}</li>
                  <li>{t('privacyPolicy.content4.item2')}</li>
                  <li>{t('privacyPolicy.content4.item3')}</li>
                  <li>{t('privacyPolicy.content4.item4')}</li>
                  <li>{t('privacyPolicy.content4.item5')}</li>
                </ul>
              </li>

              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('privacyPolicy.subtitle5')}</h2>
                <p className="font-normal">{t('privacyPolicy.content5')}</p>   
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('privacyPolicy.content5.item1')}</li>
                  <li>{t('privacyPolicy.content5.item2')}</li>
                  <li>{t('privacyPolicy.content5.item3')}</li>
                  <li>{t('privacyPolicy.content5.item4')}</li>
                </ul>
              </li>

              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('privacyPolicy.subtitle6')}</h2>
                <p className="font-normal">{t('privacyPolicy.content6')}</p>
              </li>

              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('privacyPolicy.subtitle7')}</h2>
                <p className="font-normal">{t('privacyPolicy.content7')}</p>
                <ul className="list-disc ml-5 font-normal">
                  <li>{t('privacyPolicy.content7.item1')}</li>
                  <li>{t('privacyPolicy.content7.item2')}</li>
                  <li>{t('privacyPolicy.content7.item3')}</li>
                  <li>{t('privacyPolicy.content7.item4')}</li>
                  <li>{t('privacyPolicy.content7.item5')}</li>
                  <li>{t('privacyPolicy.content7.item6')}</li>
                  <li>{t('privacyPolicy.content7.item7')}</li>
                  <li>{t('privacyPolicy.content7.item8')}</li>
                </ul>
              </li>
           
              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('privacyPolicy.subtitle8')}</h2>
                <p className="font-normal">{t('privacyPolicy.content8')}</p>
              </li>

              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('privacyPolicy.subtitle9')}</h2>
                <p className="font-normal">{t('privacyPolicy.content9')}</p>
              </li>

              <li className="font-bold">            
                <h2 className="mt-8 text-xl font-bold">{t('privacyPolicy.subtitle10')}</h2>
                <p className="font-normal">{t('privacyPolicy.content10')}</p>
              </li>
            
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}