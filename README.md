![image](https://github.com/user-attachments/assets/a1008f93-f486-4bea-b634-cc44330ed514)
please install this packages on server


1st make sure your start up is set in multiple by right clickin on the solution and click properties
![image](https://github.com/user-attachments/assets/b251f65a-bc87-4e11-b88b-df124639ee02)
and click multiple and make sure that the 2 field is set the actions both to Start see the yellow circle 
![image](https://github.com/user-attachments/assets/69ddf579-8512-4174-afa1-060bc268f9c6)
Next is go to the EmployeeDetails.Server and find the appsettings.json 
![image](https://github.com/user-attachments/assets/836832da-788e-4b4d-8f64-089469e91985)
open that and please edit the DefaultConnection to your own server's preference 
![image](https://github.com/user-attachments/assets/e84fef89-e979-4467-acfe-96fc494d333c)
after that go to the client folder and find vite.config.ts and open it and edit the target based on your own local host under server/proxy
![image](https://github.com/user-attachments/assets/c1e9a876-7a6c-44e4-af4b-4aa10af935bf)
now go to tools(red circle) and hover nuget package mangaer and click package manager console(yellow circle)
![image](https://github.com/user-attachments/assets/5c8eeb31-e14f-4e4d-a832-10cf9f9bc01b)
and run the code below to nuget console
cd <server folder location>
dotnet ef migrations add initial
dotnet ef database update
after that you can start the system please refresh in the 1st boot
