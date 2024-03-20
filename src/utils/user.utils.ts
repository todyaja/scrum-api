async function validateUser(userId: number){
    //Check is there a user that creates the ticket by id
    const creator = await this.prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (creator == null) {
        throw Error(
          'user with the id ' + userId.toString() + ' not found',
        );
      }
}

export {validateUser}