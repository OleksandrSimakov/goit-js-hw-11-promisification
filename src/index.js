import './styles.css';


// задание 1
const delay = ms => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ms);
        }, ms)
    })
};
const logger = time => console.log(`Resolved after ${time}ms`);

// Вызовы функции для проверки
delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms


// задание 2
const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
    const updatedUsers = allUsers.map(user =>
        user.name === userName ? { ...user, active: !user.active } : user,
    );
    return new Promise((resolve) => {
        resolve(updatedUsers)
    })
};

const logger2 = updatedUsers => console.table(updatedUsers);

/*
 * Сейчас работает так
 */
// toggleUserState(users, 'Mango', logger2);
// toggleUserState(users, 'Lux', logger2);

/*
 * Должно работать так
 */
toggleUserState(users, 'Mango').then(logger2);
toggleUserState(users, 'Lux').then(logger2);


// задание 3
const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = transaction => {
    
  return new Promise((resolve, reject) => {
    const delay2 = randomIntegerFromInterval(200, 500);

        setTimeout(() => {
            const canProcess = Math.random() > 0.3;
            if (canProcess) {
              resolve([transaction.id, delay2]);
            } else {
                reject(transaction.id);
            }
        }, delay2);
    })
};

const logSuccess = id => {
  console.log(`Transaction ${id[0]} processed in ${id[1]}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

/*
 * Работает так
 */
// makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
// makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);
// makeTransaction({ id: 72, amount: 75 }, logSuccess, logError);
// makeTransaction({ id: 73, amount: 100 }, logSuccess, logError);
/*
 * Должно работать так
 */
makeTransaction({ id: 70, amount: 150 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 71, amount: 230 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 72, amount: 75 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 73, amount: 100 })
  .then(logSuccess)
  .catch(logError);