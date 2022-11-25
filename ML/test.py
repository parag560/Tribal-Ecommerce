

class Doctor:
    def __init__(self,*args) :
        self.doctorid = args[0]
        self.doctorname = args[1]
        self.speci = args[2]
        self.consu = args[3]
class Clinic:
    def __init__(self,*args):
        self.docList = args[0]
    
    def searchByDoctorName(self,name):
        
        for obj in self.docList:
            if obj.doctorname.lower() == name.lower():
                nmLs.append(obj)
        return nmLs


    def findSpecializationbyID(self,idLs):
        for id in idLs:
            for obj in self.docList:
                if obj.doctorid == id:
                    speLs.append(str(id)+": "+str(obj.speci))
        return speLs



if __name__=="__main__":
    nmLs=[]
    speLs=[]
    docObjLs=[]
    idLs=[]
    n=int(input())
    for i in range(n):
        id = int(input())
        nm = input()
        sp = input()
        co = int(input())
        docObj = Doctor(id,nm,sp,co)
        docObjLs.append(docObj)
    cliObj = Clinic(docObjLs)
    nam = input()
    a=int(input())
    for i in range(a):
        idLs.append(int(input()))
    res0= cliObj.searchByDoctorName(nam)
    res1= cliObj.findSpecializationbyID(idLs)

    if res0:
        for item in res0:
            print(
f'''{item.doctorid}
{item.doctorname}
{item.speci}
{item.consu}''')

    else:
        print("No Doctor Exists with given Doctor Name")
    if res1:
        for item in res1:
            print(f"{item}")
    else:
        print("No Doctor(s) with the given ID")