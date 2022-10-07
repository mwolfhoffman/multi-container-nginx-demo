from graphene_django import DjangoObjectType
import graphene
from core.schemas.user import Query as UserQuery
from core.schemas.user import Mutation as UserMutation
from core.schemas.todo import Query as TodoQuery
from core.schemas.todo import Mutation as TodoMutation


class Query(UserQuery, TodoQuery):
    pass


class Mutation(UserMutation, TodoMutation):
    pass


schema = graphene.Schema(
    query=Query,
    mutation=Mutation
)
