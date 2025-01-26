public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        for (int i = 0; i < nums.Length; i++)
        {
            for (int j = 0; j < nums.Length; j++)
            {
                if (nums[i] + nums[j] == target && i != j)
                {
                    return new int[] { i, j };
                }
            }
        }
        
        return new int[] { };
    }
}


public class Program
{
    public static void Main(String[] args)
    {
        Solution solution = new Solution();

        int[] result = solution.TwoSum(new int[] {1,2,3,4,5}, 8);
        
        Console.WriteLine(string.Join(",", result));
    }
}