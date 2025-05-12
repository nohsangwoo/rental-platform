"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle } from "lucide-react"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "새로운 예약 요청",
      message: "홍길동님이 [5 mins to Gerong Station] gerong stay에 예약을 요청했습니다.",
      time: "오늘 14:23",
      isRead: false,
      type: "reservation",
    },
    {
      id: 2,
      title: "새로운 메시지",
      message: "김철수님이 새로운 메시지를 보냈습니다.",
      time: "어제",
      isRead: true,
      type: "message",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">알림</h1>
        <Button variant="outline" size="sm">
          모두 읽음 표시
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">전체 ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">읽지 않음 ({notifications.filter((n) => !n.isRead).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`overflow-hidden hover:shadow-md transition-shadow ${!notification.isRead ? "border-l-4 border-l-rose-500" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${!notification.isRead ? "bg-rose-100 text-rose-500" : "bg-gray-100 text-gray-500"}`}
                      >
                        <Bell className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      {!notification.isRead && (
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bell className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">알림이 없습니다.</h3>
                  <p className="text-gray-500 text-sm mb-4">새로운 알림이 없습니다.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-4">
            {notifications.filter((n) => !n.isRead).length > 0 ? (
              notifications
                .filter((n) => !n.isRead)
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className="overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-rose-500"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center">
                          <Bell className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bell className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">읽지 않은 알림이 없습니다.</h3>
                  <p className="text-gray-500 text-sm mb-4">모든 알림을 확인하셨습니다.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
