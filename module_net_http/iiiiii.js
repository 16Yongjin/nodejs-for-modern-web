function parts(s, n, p) {
  console.log(`parts(${s}, ${n}, ${p})`);
  if (s < p) return [];
  if (n == 1) {
    console.log(`if (n == 1) ${s} < 10 ? [[s]] : [] - parts(${s}, ${n}, ${p}) returning`, s < 10 ? [[ JSON.stringify(s)]] : []);
    return s < 10 ? [[s]] : [];
  }
  const a = [];
  console.log(`for (let i=${p}; i < 10; ++i)`);
  for (let i = p; i < 10; ++i)
    for (const xs of parts(s - i, n - 1, i))   {
      a.push((xs.unshift(i), xs));
      console.log('a.push((xs.unshift(i), xs)) -', JSON.stringify(a) );
    }

    console.log(`parts(${s}, ${n}, ${p}) returning ${JSON.stringify(a)}`)
  return a;
}