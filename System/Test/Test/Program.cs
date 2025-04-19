void DoWork()
{
    for (int i = 0; i < 5; i++)
    {
        Console.WriteLine($"Поток: {Thread.CurrentThread.ManagedThreadId} — {i}");
        Thread.Sleep(500); // пауза
    }
}

Thread t1 = new Thread(DoWork);
Thread t2 = new Thread(DoWork);

t1.Start(); // запускаем поток 1
t2.Start(); // запускаем поток 2

DoWork(); // выполняем в главном потоке