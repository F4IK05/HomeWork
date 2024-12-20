﻿// Task 1

void Counter(int[] arr)
{
    int even_counter = 0;
    int odd_counter = 0;
    int unique_counter = 0;
    
    for (int i = 0; i < arr.Length; i++)
    {
        if (arr[i] % 2 == 0) even_counter++;
        else odd_counter++;

        int counter = 0;
        for (int j = 0; j < arr.Length; j++) if (arr[i] == arr[j]) counter++;
            
        if (counter == 1) unique_counter++;

    }

    Console.WriteLine($"Even Counter: {even_counter}");
    Console.WriteLine($"Odd Counter: {odd_counter}");
    Console.WriteLine($"Unique Counter: {unique_counter}");
}


int[] array = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2};
Counter(array);


// Task 2

// void Find(int[] arr, int digit)
// {
//     int counter = 0;
//     for (int i = 0; i < arr.Length; i++)
//     {
//         if (arr[i] < digit)
//         {
//             counter++;
//         }
//     }
//     Console.WriteLine($"The number of numbers less than {digit} is {counter}");
// }
//
// int[] array = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9};
// Console.WriteLine("Chislo: ");
// int digit = int.Parse(Console.ReadLine());
//
// Find(array, digit);



// Task 3

// void Find(int[] arr, int num1, int num2, int num3)
// {
//     int counter = 0;
//     for (int i = 0; i < arr.Length; i++)
//     {
//         if (arr[i] == num1 && arr[i + 1] == num2 && arr[i + 2] == num3)
//         {
//             counter++;
//         }
//     }
//     Console.WriteLine(counter);
// }
//
// int[] array = new int[] { 7, 6, 5, 3, 4, 7, 6, 5, 8, 7, 6, 5};
//
// Console.WriteLine("Num1: ");
// int num1 = int.Parse(Console.ReadLine());
// Console.WriteLine("Num2: ");
// int num2 = int.Parse(Console.ReadLine());
// Console.WriteLine("Num3: ");
// int num3 = int.Parse(Console.ReadLine());
//
// Find(array, num1, num2, num3);





// Task 4

// void Obciy(int[] array1, int[] array2, int[] array3)
// {
//     int count = 0;
//     for (int i = 0; i < array1.Length; i++)
//     {
//         for (int j = 0; j < array2.Length; j++)
//         {
//             if (array1[i] == array2[j])
//             {
//                 bool isDuplicated = false;
//                 
//                 for (int k = 0; k < array3.Length; k++)
//                 {
//                     if (array3[k] == array1[i])
//                     {
//                         isDuplicated = true;
//                         break;
//                     }
//                 }
//
//                 if (!isDuplicated)
//                 {
//                     array3[count] = array1[i];
//                     count++;
//                 }
//             }
//         }
//     }
// }
//
// int[] array1 = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9};
// int[] array2 = new int[] { 1, 2, 3, 4, 5, 5, 5 };
// int[] array3 = new int[array1.Length > array2.Length ? array2.Length : array1.Length];
//
// Obciy(array1, array2, array3);
//
// for (int i = 0; i < array3.Length; i++)
// {
//     if (array3[i] != 0) Console.Write(array3[i] + " ");
// }




// Task 5

// void MinMax(int[,] arr)
// {
//     int rows = arr.GetLength(0);
//     int cols = arr.GetLength(1);
//     
//     int min = arr[0, 0];
//     int max = arr[0, 0];
//
//     for (int i = 0; i < rows; i++)
//     {
//         for (int j = 0; j < cols; j++)
//         {
//             if (arr[i, j] < min)
//             {
//                 min = arr[i, j];
//             }
//
//             if (arr[i, j] > max)
//             {
//                 max = arr[i, j];
//             }
//         }
//     }
//     Console.WriteLine($"Min: {min}, Max: {max}");
// }
//
//
// int[,] arr = new int[,] { {1,2,3}, {4,5,6}, {7,0,9}, {10,11,12} };
//
// MinMax(arr);



// Task 6

// void WordCounter(string sentence)
// {
//     int count = sentence.Split(new char[] { ' ', ',', '.'}, StringSplitOptions.RemoveEmptyEntries).Length;
//     
//     Console.WriteLine(count);
//     
// }
//
// string sentence = Console.ReadLine();
//
// WordCounter(sentence);


// Task 7

// void ReverseSentence(string sentence)
// {
//     string[] words = sentence.Split(' ', StringSplitOptions.RemoveEmptyEntries);
//
//     foreach (string word in words)
//     {
//         for (int i = word.Length - 1; i >= 0; i--)
//         {
//             Console.Write(word[i]);
//         
//         } 
//         Console.Write(' ');
//     }
//
//     
// }
//
// string sentence = Console.ReadLine();
//
// ReverseSentence(sentence);


// Task 8

// void VowelsLetters(string sentence)
// {
//     int counter = 0;
//     sentence = sentence.ToLower();
//     for (int i = 0; i < sentence.Length; i++)
//     {
//         if (sentence[i] == 'a' || sentence[i] == 'e' || sentence[i] == 'i' || sentence[i] == 'o' || sentence[i] == 'u')
//         {
//             counter++;
//         }
//     }
//     
//     Console.WriteLine($"Count of vowels: {counter}");
// }
//
// string sentence = Console.ReadLine();
//
// VowelsLetters(sentence);


// Task 9

// void SubstrCount(string sentence, string substr)
// {
//     int count = 0;
//     string[] words = sentence.Split(' ', StringSplitOptions.RemoveEmptyEntries);
//
//     foreach (string word in words) 
//     {
//         if (word == substr)
//         {
//             count++;
//         }
//     }
//     
//     Console.WriteLine($"Result: {count}");
// }
//
// Console.WriteLine("Write sentence:");
// string sentence = Console.ReadLine();
//
// Console.WriteLine("Write substr:");
// string substr = Console.ReadLine();
//
// SubstrCount(sentence, substr);