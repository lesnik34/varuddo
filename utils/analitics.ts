import ym from 'react-yandex-metrika';

export const yandexReachGoal = (target: string) => {
  const id = process.env.NEXT_PUBLIC_YANDEX_ANALYTICS_ID;
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (id === undefined || isDevelopment) {
    console.log(`%c[YandexMetrika](ReachGoal)`, `color: orange`, target);
    return;
  }

  ym('reachGoal', target);
};
